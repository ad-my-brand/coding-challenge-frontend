import type { NextPage } from 'next'
import FormComponent from '../components/FormComponent'
import MapComponent from '../components/MapComponent'
import Selector from '../components/Selector'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center min-h-[500px] min-w-[1000px]">
      <div className='flex-1 h-full flex justify-center items-center w-3/4'>
        <MapComponent/>
      </div>
      <div className='flex flex-col h-full items-center justify-start bg-white p-6 w-1/4'>
      <FormComponent />
      <Selector/>
      </div>
    </div>
  )
}

export default Home
