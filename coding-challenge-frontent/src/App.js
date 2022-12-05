import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./Components/Form/Form";
import LocationMap from "./Components/LocationMap/LocationMap";
import { Toaster } from 'react-hot-toast';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Form></Form>
    },
    {
      path:'/map/:id',
      element: <LocationMap></LocationMap>,
      loader: async ({params}) => fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
    },
  ])
  return (
    <div style={{height:"100vh"}}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster/>
    </div>
  );
}

export default App;
