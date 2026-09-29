import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

  const [token, setToken] = useState(getToken);

  const sendData = {
    token,
    setToken,
  };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

// This file intentionally exports both the provider component and its hook.
// The hook is kept here so consumers can use the context from one module.
// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => {
  const context = useContext(ContextApi);
  return context;
};
