"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export  function UserProvider({ children }) {
  const [userData, setUserdata] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserdata }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
