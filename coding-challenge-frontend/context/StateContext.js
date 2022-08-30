import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showForm, setshowForm] = useState(false);
  const [position, setPosition] = useState([28.7041, 77.1025]);
  const [Address, setAddress] = useState("");

  return (
    <Context.Provider
      value={{
        showForm,
        position,
        Address,
        setAddress,
        setshowForm,
        setPosition,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
