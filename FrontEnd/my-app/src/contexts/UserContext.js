import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [entregas, setEntregas] = useState([]);
  const [home, sethome] = useState([]); //adicionar 

  
  const addEntrega = (novaEntrega) => {
    setEntregas((prevEntregas) => [...prevEntregas, novaEntrega]);
  };

  
  const updateEntregas = (novasEntregas) => {
    setEntregas(novasEntregas);

  };

//Adicionar 
  const isMorador = () => userData?.tipo_usuario === 'morador';
  const isPorteiro = () => userData?.tipo_usuario === 'porteiro';
  const isSindico = () => userData?.tipo_usuario === 'sindico';
  
// adicionar tbm  isMorador,isPorteiro,isSindico
  return (
    <UserContext.Provider value={{ userData, setUserData, entregas, setEntregas, addEntrega, updateEntregas ,
       isMorador,
      isPorteiro,isSindico}}> 



      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
