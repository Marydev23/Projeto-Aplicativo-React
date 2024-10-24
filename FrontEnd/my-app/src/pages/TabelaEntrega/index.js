import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { URL_API } from '../../utils/api-utils';

const EntregarScreen = () => {
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
      const data_retirada = new Date().toISOString(); 

      
      await axios.put(URL_API + `/entregar/${entregaId}`, { 
        status: 'Retirado', 
        data_retirada: data_retirada 
      });
      
     
      setEntregas(prevEntregas => 
        prevEntregas.map(entrega => 
          entrega.id === entregaId ? { ...entrega, status: 'Retirado', data_retirada: data_retirada } : entrega
        )
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
      {item.status !== 'Retirado' && ( 
        <TouchableOpacity style={styles.button} onPress={() => handleRetirar(item.id)}>
          <Text style={styles.buttonText}>Retirar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Entregas</Text>
      <FlatList
        data={entregas}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderEntregaItem}
      />
    </View>
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
