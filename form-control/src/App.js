import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './card';
import Input from './input';

function App() {
const[users, setUsers] = useState([]);
const Url = 'https://jsonplaceholder.typicode.com/users';

const fetchUrl = async() => { 
  try {
      const Response = await fetch(Url);
      const users = await Response.json();
      setUsers(users)
  } catch(err) {
    console.log('err')
  }
}

  useEffect(() => {
  return  fetchUrl()
    }, [])


  return (
    <section className= 'container'>
      <h1>List of Users.</h1>
      <div className= 'content'>{
        users.map((list, index) => {
          return <Card key= {index} {...list} />
        })  
      }</div>
      <Input />
    </section>
  );
}

export default App;
