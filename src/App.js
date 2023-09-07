import { useState, useEffect } from "react";
import CustomForms from "./components/customForm/CustomForms"
import Map1 from "./components/maps/Map1"
import Navbar from "./components/nav/Navbar";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { MoonLoader } from 'react-spinners'



function App() {
  const [users, setusers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSelect = (e) => {
    const userId = e.target.value
    setSelectedUser(userId)
  }





  useEffect(() => {
    setIsLoading(true)
    const usersURL = 'https://jsonplaceholder.typicode.com/users'
    const fetchUsers = async () => {
      try {
        const response = await axios.get(usersURL)
        const users = await response.data
        setusers(users)
        enqueueSnackbar('Fetched users successfully', { variant: 'success', })
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
        console.error(`Problem while fetching data => `, error.message)
      }
    }

    setIsLoading(false)


    fetchUsers()


  }, [])



  return (
    <div className="App">
      <SnackbarProvider autoHideDuration={2000} maxSnack={3} />
      <Navbar />
      <main>
        <CustomForms
          users={users}
          handleSelect={handleSelect}
          setSelectedUser={setSelectedUser}
        />
        {isLoading ? (
          <MoonLoader color={"#0088E1"} size={45} />
        ) : (
          <Map1 users={users} userId={selectedUser} />

        )}
      </main>
    </div>
  );
}

export default App;
