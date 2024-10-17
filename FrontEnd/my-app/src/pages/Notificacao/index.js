import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const notificationsData = [
  { id: '1', message: 'Você recebeu uma nova mensagem.' },
  { id: '2', message: 'Sua entrega foi confirmada.' },
  { id: '3', message: 'Lembre-se de retirar seu pacote.' },
  { id: '4', message: 'Atualizações disponíveis para o aplicativo.' },

];

export default function Notifications() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={notificationsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#A9A9A9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#fff',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#006400',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
