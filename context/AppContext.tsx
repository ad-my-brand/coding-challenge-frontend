import React from 'react'
import { createContext } from 'react'

const AppContext = createContext({} as any)
export const useAppContext = () => {
  return React.useContext(AppContext)
}

export default AppContext
