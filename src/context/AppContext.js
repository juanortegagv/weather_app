import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
      {children}
    </AppContext.Provider>
  );
};
