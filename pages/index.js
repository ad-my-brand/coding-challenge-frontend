import { useState } from 'react'
import styles from '../styles/Home.module.css'
import FormComponent from '../components/formComponent'
import MapComponent from '../components/mapComponent'

export default function Home() {
    
  const [id,setId] =useState([])
  const [user, setUser] = useState([])
  const [coordinates, setCoordinates] = useState({lat:20.5937,lng:78.9629})
  const [filter, setFilter] = useState({lat:20.5937,lng:78.9629})
  return (
    <div className={styles.container}>
      <FormComponent id={id} setId={setId} setUser={setUser} user={user} setFilter={setFilter} />
      <MapComponent id={id}  coordinates={ coordinates} user={user} filter={filter} />
    </div>
  )
}
