import React, { createContext, useContext, useState } from "react";

const context = createContext();

export function UserContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");

  return (
    <context.Provider value={{ cart, setCart, id, setId }}>
      {children}
    </context.Provider>
  );
}

export function useUserContext() {
  return useContext(context);
}
