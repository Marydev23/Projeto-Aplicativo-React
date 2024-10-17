import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TabelaEntregas() {
  const navigation = useNavigation();
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar as entregas do backend
    fetch('http://192.168.0.6:5001/entregas')
      .then((response) => response.json())
      .then((data) => {
        setEntregas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar as entregas:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Carregando entregas...</Text>;
  }

  if (entregas.length === 0) {
    return <Text>Nenhuma entrega encontrada</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela de Entregas</Text>
      <FlatList
        data={entregas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>ID da Entrega: {item.id}</Text>
            <Text style={styles.text}>Data de Entrega: {item.data_entrega}</Text>
            <Text style={styles.text}>Data de Retirada: {item.data_retirada}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>ID do Armário: {item.armario_id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
