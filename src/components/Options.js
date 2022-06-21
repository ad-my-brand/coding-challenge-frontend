import { Button } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
const Options = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1>click on below buttons</h1>
        <Button variant='outlined' color='primary' onClick={() => navigate('/form')}>Form submition</Button>
        <Button variant='outlined' color='secondary' onClick={() => navigate('/fetchdata')}>Fetch Data</Button>
        <Button variant='outlined' color='inherit' onClick={() => navigate('/postdata')} >Post Data</Button>
    </div>
  )
}

export default Options