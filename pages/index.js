import { useState } from 'react'
import styles from '../styles/Home.module.css'
import FormComponent from '../components/formComponent'
import MapComponent from '../components/mapComponent'

export default function Home() {
    
  const [name,setName] =useState([])
  const [coodinates, setCoodinates] = useState({lat:0,lng:0})
  return (
    <div className={styles.container}>
      <FormComponent setName={setName}  />
      <MapComponent name={name} coorinates={coodinates}/>
    </div>
  )
}
