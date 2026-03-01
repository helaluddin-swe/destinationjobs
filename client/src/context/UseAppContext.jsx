import { createContext, useContext, useMemo } from "react";

// 1. Name the context clearly
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_API_URL;

  // 2. Memoize the value to prevent unnecessary rerenders
  const value = useMemo(() => ({
    backendUrl
  }), [backendUrl]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

// 3. Custom hook for easier consumption
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};