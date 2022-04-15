import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import Person from '../interfaces/person.interface'

const style = {
  name: 'w-full p-2 text-lg text-gray-600 my-4',
  selected_name:
    'w-full p-2 text-lg text-gray-100 my-4 bg-gray-600 py-4 rounded-lg',
}

const Selector = () => {
  const { data, id, changePerson } = useAppContext()

  /**
   * Change id based on name(id) selected
   * @param id id of the Person
   */
  const handleSelection = (id: Person['id']) => {
    changePerson(id)
  }

  return (
    <div className='flex flex-col justify-start items-start w-full h-full overflow-auto'>
      <h1 className="text-2xl text-gray-600 border-b-4 border-gray-400 w-full">Names</h1>
      <div className="flex w-full flex-col items-start justify-start p-2 max-h-full overflow-y-scroll">
        {data.map((person: Person) => {
          return (
            <div
              className={id === person.id ? style.selected_name : style.name}
              key={person.id}
              onClick={() => handleSelection(person.id)}
            >
              {person.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Selector
