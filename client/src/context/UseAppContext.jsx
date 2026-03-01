import { createContext, useContext } from "react";

const createAppContext=createContext()
const ContextProvider=({children})=>{
  const backendUrl=import.meta.env.VITE_API_URL


  const value={
    backendUrl

  }
  return (
     <createAppContext.Provider value={value}>
    {children}
  </createAppContext.Provider>)
  
}
export default ContextProvider

export const useAppContext=()=>{
  return (
    useContext(createAppContext)
  )
}