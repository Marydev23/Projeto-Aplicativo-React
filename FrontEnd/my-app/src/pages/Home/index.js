import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image ,TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../contexts/UserContext';
import * as LocalAuthentication from 'expo-local-authentication';


export default function Home() { 
  const navigation = useNavigation();
  const { userData } = useUser(); 
  const userType = userData?.tipo_usuario; 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('Tipo de Usuário:', userType);  
  
    async function verifyAvaiableAuthentication() {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log(compatible);
  
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
    }
  
    async function handleAuthentication() {
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
      if(!isBiometricEnrolled){
        return Alert.alert('Atenção', 'Nenhuma biometria encontrada. Por favor, Cadastre no dispositivo!');
      }
  
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Secure Mail',
        fallbackLabel: 'Biometria não reconhecida'
  
      });
      
      setIsAuthenticated(auth.success);
    }
    
    useEffect(() => {
      verifyAvaiableAuthentication();
    }, []);

  return (
    <View style={styles.container}>
      <animatable.View style={styles.containerHeader}>
        <Text style={styles.message}>Olá! Seja bem-vindo.</Text>
        <Text style={styles.messageText}>O que deseja fazer?</Text>
      </animatable.View>

      <View style={styles.buttonContainer}>

      
        {(userType === 'sindico' || userType === 'porteiro') && (
          <TouchableOpacity style={userType === 'porteiro' ? styles.depositButton : styles.squareButton} onPress={() => {isAuthenticated ? navigation.navigate('Depositar') : handleAuthentication()}}>
            <View style={styles.iconContainer}>
              <Icon name="arrow-forward" size={30} color="#fff" /> 
              <Icon name="cube" size={30} color="#fff" />
            </View>
            <Text style={styles.messageTextDR}>{isAuthenticated ? 'Depositar' : 'Desbloquear\ndepósito'}</Text>
          </TouchableOpacity>
        )}

    
        {(userType === 'morador' || userType === 'sindico') && (
          <TouchableOpacity style={userType === 'morador' ? styles.depositButton : styles.squareButton} 
          onPress={() => {isAuthenticated ? navigation.navigate('Retirar') : handleAuthentication()}}>
            <View style={styles.iconContainer}>
              
              <Icon name="arrow-back" size={30} color="#fff" />
              <Icon name="cube" size={30} color="#fff" />
            </View>
            <Text style={styles.messageTextDR}>{isAuthenticated ? 'Retirar' : 'Desbloquear\narmário'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>

        
        {(userType === 'morador' || userType === 'sindico') && (
          <TouchableOpacity style={userType === 'morador' ? styles.depositButton : styles.squareButton} 
          onPress={() => navigation.navigate('TabelaEntrega')}>
            <Text style={styles.messageTextDR}>Histórico</Text>
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
    fontSize: 16,
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
