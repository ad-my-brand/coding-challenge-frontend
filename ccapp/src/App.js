import React from 'react';
import './App.css'; // You can include your Tailwind CSS styles here
import Form from './Components/Form';


function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Coding Challenge</h1>
      <Form />
    </div>
  );
}

export default App;
