// Condominio.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';

const Condominio = () => {
  const [moradores, setMoradores] = useState([]);
  const [porteiros, setPorteiros] = useState([]);
  const [sindicos, setSindicos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (tipo) => {
    try {
      let url;
      if (tipo === 'moradores') {
        url = 'http://192.168.0.10:5001/moradores';
      } else if (tipo === 'porteiros') {
        url = 'http://192.168.0.10:5001/porteiros';
      } else if (tipo === 'sindicos') {
        url = 'http://192.168.0.10:5001/sindicos';
      }

      const response = await fetch(url);
      const data = await response.json();

      if (tipo === 'moradores') {
        setMoradores(data);
      } else if (tipo === 'porteiros') {
        setPorteiros(data);
      } else if (tipo === 'sindicos') {
        setSindicos(data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Alert.alert('Erro', 'Não foi possível buscar os dados. Verifique a conexão.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('moradores'); // Carrega os moradores na inicialização
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>Nome: {item.nome}</Text>
      <Text>Sobrenome: {item.sobrenome}</Text>
      <Text>Apartamento: {item.N_ap}</Text>
      <Text>Telefone: {item.telefone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <Text style={styles.header}>Moradores</Text>
          <FlatList
            data={moradores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <Button title="Buscar Moradores" onPress={() => fetchData('moradores')} color='#006400' />

          <Text style={styles.header}>Porteiros</Text>
          <FlatList
            data={porteiros}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <Button title="Buscar Porteiros" onPress={() => fetchData('porteiros')} color='#006400'/>

          <Text style={styles.header}>Síndicos</Text>
          <FlatList
            data={sindicos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
         
          <Button title="Buscar Síndicos" onPress={() => fetchData('sindicos')} color='#006400'/>
        
        </>
        

        
        
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D3D3D3',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    
  },

  itemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default Condominio;
