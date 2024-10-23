import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'; 
import { UserProvider } from './src/contexts/UserContext'; 

export default function App() {
  return (
    <UserProvider> 
      <NavigationContainer>
        <StatusBar backgroundColor="#006400" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </UserProvider>
  );
}
