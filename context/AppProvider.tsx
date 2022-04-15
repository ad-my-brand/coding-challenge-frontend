import React, { useEffect, useState } from 'react'
import Person, { Geo } from '../interfaces/person.interface'
import AppContext from './AppContext'

const AppProvider: React.FC = (props) => {
  const [data, setData] = useState<Array<Person>>([])
  const [id, setId] = useState<number>(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const responseData = await response.json()
      setData(responseData)
    }

    fetchData()
  }, [])

  // useEffect(() => {
  //   if (data.length) console.log(data[id - 1].address.geo)
  // }, [id])

  const changePerson = (id: Person['id']) => {
    setId(id)
  }

  return (
    <AppContext.Provider value={{ data, id, changePerson }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
