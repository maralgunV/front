import React, { createContext, useContext, useState } from "react";
import { Sidebar } from "flowbite-react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <AppContext.Provider value={{ userData, updateUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
