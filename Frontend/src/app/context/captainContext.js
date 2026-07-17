'use client';
import { createContext, useContext, useState } from "react";

const CaptainContext = createContext(null);

export function CaptainProvider({ children }) {
  const [captain, setCaptain] = useState(null);

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
}

export function useCaptain() {
  const context = useContext(CaptainContext);

  if (context === undefined) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }

  return context;
}
