import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const FormComponent = () => {
  const {id} = useAppContext()

  // Handle the submit event on form submit.
  const handleSubmit = async (event:React.BaseSyntheticEvent) => {
    event.preventDefault()

    const data = {
      title: event.target.title.value,
      body: event.target.body.value,
      userId: id,
    }
    const JSONdata = JSON.stringify(data)

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      body: JSONdata,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    alert(`Data: ${JSONdata} \nResponse Status: ${String(response.status)}`)
  }

  return (
      <form className='flex flex-col bg-white w-full' onSubmit={handleSubmit}>
        <label className='text-gray-600 text-2xl' htmlFor="title">Title</label>
        <input className='border-4 p-2 border-gray-300 rounded-lg text-xl' type="text" id="title" name="title" required />
        <label className='text-gray-600 text-2xl' htmlFor="body">Body</label>
        <input className='border-4 p-2 border-gray-300 rounded-lg text-xl' type="text" id="body" name="body" required />

        <button className='px-10 py-3 my-6 bg-gray-400 rounded-xl text-gray-100 text-2xl' type="submit">Submit</button>
      </form>
  )
}

export default FormComponent
