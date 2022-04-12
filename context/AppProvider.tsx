import React, { useState } from 'react'
import AppContext from './AppContext'

const AppProvider: React.FC = (props) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>
}

export default AppProvider
