import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

     
      <animatable.View style={styles.containerHeader}>
        <Text style={styles.message}>Olá! Seja bem-vindo.</Text>
        <Text style={styles.messageText}>O que deseja fazer?</Text>
      </animatable.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Depositar')}>
          <View style={styles.iconContainer}>
            <Icon name="arrow-forward" size={30} color="#fff" /> 
            <Icon name="cube" size={30} color="#fff" />
          </View>
          <Text style={styles.messageTextDR}>Depositar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Retirar')}>
          <View style={styles.iconContainer}>
            <Icon name="arrow-back" size={30} color="#fff" />
            <Icon name="cube" size={30} color="#fff" />
          </View>
          <Text style={styles.messageTextDR}>Retirar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('TabelaEntrega')}>
          <Text style={styles.messageTextDR}>Minhas Entregas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Condominio')}>    
          <Text style={styles.messageTextDR}>Condomínio</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
}

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
  iconPerfil: {
    position: 'absolute',
    top: 15,
    left: 60,
    flexDirection: 'row',
  },
  perfilContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
      
    
  },

  textSecure: {
    fontSize: 20,
    marginLeft: 10, 
    marginTop: 15,
  },
  iconSecure: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', 
    marginBottom: 2, 
  },
});