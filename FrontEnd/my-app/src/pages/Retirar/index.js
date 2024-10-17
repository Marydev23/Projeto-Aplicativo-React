import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Retirar() {
  const navigation = useNavigation();
  const [encomendas, setEncomendas] = useState([]);
  const userId = 1; // Substitua pelo ID do usuário logado

  useEffect(() => {
    const fetchEncomendas = async () => {
      try {
        const response = await fetch(`http://192.168.0.6:5001/retirar/${userId}`);
        const data = await response.json();
        setEncomendas(data);
      } catch (error) {
        console.error('Erro ao buscar encomendas:', error);
      }
    };

    fetchEncomendas();
  }, [userId]); // Dependência do userId

  const retirarEncomenda = async (idEncomenda, armario) => {
    try {
      const response = await fetch(`http://192.168.0.6:5001/Retirar/${idEncomenda}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(`Encomenda retirada do armário ${armario}`);
        setEncomendas(encomendas.filter((encomenda) => encomenda.id !== idEncomenda));
      } else {
        Alert.alert('Erro', data.message || 'Erro ao retirar encomenda');
      }
    } catch (error) {
      console.error('Erro ao retirar encomenda:', error);
      Alert.alert('Erro ao retirar encomenda');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suas Encomendas</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Armário</Text>
        <Text style={styles.headerText}>Data</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>

      {encomendas.length > 0 ? (
        encomendas.map((encomenda) => (
          <View key={encomenda.id} style={styles.tableRow}>
            <Text style={styles.rowText}>{encomenda.armario}</Text>
            <Text style={styles.rowText}>{encomenda.data}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.rowText}>{encomenda.status}</Text>
              {encomenda.status === 'Entregue' && (
                <TouchableOpacity
                  style={styles.buttonRetirar}
                  onPress={() => retirarEncomenda(encomenda.id, encomenda.armario)}
                >
                  <Text style={styles.buttonText}>Retirar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noEncomendas}>Nenhuma encomenda disponível.</Text>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
    justifyContent: 'center', 
  },
  header: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  noEncomendas: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#006400',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  rowText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonRetirar: {
    marginTop: 5,
    backgroundColor: '#006400',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
