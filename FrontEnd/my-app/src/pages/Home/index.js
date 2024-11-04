import React from 'react';
import { Text, View, StyleSheet, Image ,TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../contexts/UserContext';




export default function Home() { 
  const navigation = useNavigation();
  const { userData } = useUser(); 

  const userType = userData?.tipo_usuario; 
  console.log('Tipo de Usuário:', userType);  

  return (
    <View style={styles.container}>
      <animatable.View style={styles.containerHeader}>
        <Text style={styles.message}>Olá! Seja bem-vindo.</Text>
        <Text style={styles.messageText}>O que deseja fazer?</Text>
      </animatable.View>

      <View style={styles.buttonContainer}>

      
        {(userType === 'sindico' || userType === 'porteiro') && (
          <TouchableOpacity style={userType === 'porteiro' ? styles.depositButton : styles.squareButton} onPress={() => navigation.navigate('Depositar')}>
            <View style={styles.iconContainer}>
              <Icon name="arrow-forward" size={30} color="#fff" /> 
              <Icon name="cube" size={30} color="#fff" />
            </View>
            <Text style={styles.messageTextDR}>Depositar</Text>
          </TouchableOpacity>
        )}

    
        {(userType === 'morador' || userType === 'sindico') && (
          <TouchableOpacity style={userType === 'morador' ? styles.depositButton : styles.squareButton} onPress={() => navigation.navigate('Retirar')}>
            <View style={styles.iconContainer}>
              
              <Icon name="arrow-back" size={30} color="#fff" />
              <Icon name="cube" size={30} color="#fff" />
            </View>
            <Text style={styles.messageTextDR}>Retirar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>

        
        {(userType === 'morador' || userType === 'sindico') && (
          <TouchableOpacity style={userType === 'morador' ? styles.depositButton : styles.squareButton} onPress={() => navigation.navigate('TabelaEntrega')}>
            <Text style={styles.messageTextDR}>Entregas</Text>
            <View style={styles.iconContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../assets/maoecaixa.png')}
                style={{ width: '100%', tintColor: '#fff' }} 
                resizeMode="contain"
              />
            </View>
            </View>
            
          </TouchableOpacity>
        )}

        
        {userType === 'sindico' && (
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Condominio')}>    
            <Text style={styles.messageTextDR}>Condomínio</Text>
            <View style={styles.iconContainer}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../assets/predio.png')}
                style={{ width: '100%', tintColor: '#fff' }} 
                resizeMode="contain"
              />
           </View>
           </View>
          </TouchableOpacity>
        )}
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
    marginTop: '15%',
    marginBottom: '25%',
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    top: 70,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 'center',
    flexDirection: 'row',

    
  },
  depositButton: {
    width: '80%', 
    height: 120,
    backgroundColor: '#006400',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, 
  },

  
});
