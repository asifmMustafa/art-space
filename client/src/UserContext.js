import React, { createContext, useContext, useState } from "react";

const context = createContext();

export function UserContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");
  const [is_artist, setIs_Artist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <context.Provider
      value={{
        cart,
        setCart,
        id,
        setId,
        is_artist,
        setIs_Artist,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useUserContext() {
  return useContext(context);
}
