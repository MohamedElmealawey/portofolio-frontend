import React, { createContext } from 'react'

export const PortfolioContext=createContext();

const PortfolioContextProvider = (props) => {
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

    const value={BACKEND_URL};
  return (
    <PortfolioContext.Provider value={value}>
        {props.children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioContextProvider