import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../contexts/UserContext';

export default function Home() { 
  const navigation = useNavigation();
  const { userData } = useUser(); //adicionar

  const userType = userData?.tipo_usuario; //adicionar
  console.log('Tipo de Usuário:', userType); // adicionar 

  return (
    <View style={styles.container}>
      <animatable.View style={styles.containerHeader}>
        <Text style={styles.message}>Olá! Seja bem-vindo.</Text>
        <Text style={styles.messageText}>O que deseja fazer?</Text>
      </animatable.View>

      <View style={styles.buttonContainer}>

        {/* Botão "Depositar" fica síndico e porteiro */}
        {(userType === 'sindico' || userType === 'porteiro') && (
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Depositar')}>
            <View style={styles.iconContainer}>
              <Icon name="arrow-forward" size={30} color="#fff" /> 
              <Icon name="cube" size={30} color="#fff" />
            </View>
            <Text style={styles.messageTextDR}>Depositar</Text>
          </TouchableOpacity>
        )}

        {/* Botão "Retirar"moradores e síndico */}
        {(userType === 'morador' || userType === 'sindico') && (
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Retirar')}>
            <View style={styles.iconContainer}>
              <Icon name="arrow-back" size={30} color="#fff" />
              <Icon name="cube" size={30} color="#fff" />
            </View>
            <Text style={styles.messageTextDR}>Retirar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>

        {/* Botão "Minhas Entregas"  moradores e síndico */}
        {(userType === 'morador' || userType === 'sindico') && (
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('TabelaEntrega')}>
            <Text style={styles.messageTextDR}>Minhas Entregas</Text>
          </TouchableOpacity>
        )}

        {/* Botão "Condomínio" so p síndicos */}
        {userType === 'sindico' && (
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Condominio')}>    
            <Text style={styles.messageTextDR}>Condomínio</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 18,
    color: '#000',
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  squareButton: {
    width: 150,
    height: 120,
    backgroundColor: '#006400',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    position: 'relative',
  },
  messageTextDR: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    top: 70,
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    left: 10,
    flexDirection: 'row',
  },
});
