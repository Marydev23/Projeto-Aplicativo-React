import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [entregas, setEntregas] = useState([]);

  
  const addEntrega = (novaEntrega) => {
    setEntregas((prevEntregas) => [...prevEntregas, novaEntrega]);
  };

  
  const updateEntregas = (novasEntregas) => {
    setEntregas(novasEntregas);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, entregas, setEntregas, addEntrega, updateEntregas }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
