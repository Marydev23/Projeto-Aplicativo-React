import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { URL_API } from '../../utils/api-utils';

const EntregarScreen = () => {
  const navigation = useNavigation();
  const { userData } = useUser(); 
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    const fetchEntregas = async () => {
      if (userData && userData.id) {
        try {
          const response = await axios.get(URL_API + `/entregar/${userData.id}`); 
          setEntregas(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchEntregas();
  }, [userData]);

  const handleRetirar = async (entregaId) => {
    try {
      await axios.put(URL_API + `/entregar/${entregaId}`, { 
        status: 'Retirado', 
        data_retirada: new Date().toISOString() 
      });
      
     
      setEntregas(prevEntregas => 
        prevEntregas.filter(entrega => entrega.id !== entregaId)
      );

      Alert.alert('Retira seu pacote.');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar o status da entrega.');
    }
  };

  const renderEntregaItem = ({ item }) => (
    <View style={styles.entregaItem}>
      <Text>Nome: {item.nome_completo}</Text>
      <Text>Data de Entrega: {item.data_entrega}</Text>
      <Text>Armário: {item.armario_id}</Text>
      <Text>Status: {item.status}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRetirar(item.id)}>
        <Text style={styles.buttonText}>Retirar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title } >Retire seu pacote</Text>
      <FlatList
        data={entregas.filter(entrega => entrega.status !== 'Retirado')} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEntregaItem}
      />

      <TouchableOpacity style={styles.button}onPress={() => {navigation.navigate('Home'); }}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>

    //onPress={() => navigation.navigate('Home');
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  entregaItem: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#006400',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default EntregarScreen;
