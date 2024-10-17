import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Entypo, Feather } from '@expo/vector-icons';


import Welcome from '../pages/Welcome';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Depositar from '../pages/Depositar';
import Retirar from '../pages/Retirar';
import Perfil from '../pages/Perfil';
import TabelaEntrega from '../pages/TabelaEntrega';
import Notificacao from'../pages/Notificacao';
import Config from'../pages/Config';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabRoutes} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Depositar"
        component={Depositar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Retirar"
        component={Retirar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabelaEntrega"
        component={TabelaEntrega}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


function TabRoutes() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarStyle: {
            backgroundColor: '#808080', 
            borderTopColor:'transparent'
        },
        tabBarActiveTintColor:'#fff',
        
    }}
>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
            headerShown: false,
            title: 'Início',
            tabBarIcon: ({ size, color }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }} 
        />


       <Tab.Screen
        name="Notificacao"
        component={Notificacao}
        options={{
            headerShown: false,
            title: 'Notificação',
            tabBarIcon: ({ size, color }) => (
                <Feather name="bell" size={24} color="#fff" />
            ),
          }} 
          />

        <Tab.Screen
        name="Config"
        component={Config}
        options={{
            headerShown: false,
            title: 'Configuração',
            tabBarIcon: ({ size, color }) => (
              <Feather name="settings" size={24} color="#fff"  />
            ),
          }}
        />
     
       <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
            headerShown: false,
            title: 'Perfil',
            tabBarIcon: ({ size, color }) => (
              <Feather name="user"  size={24} color="#fff"  />
            ),
          }} 
        />


    </Tab.Navigator>
  );
}


export default function Routes() {
  return <StackRoutes />;
}
