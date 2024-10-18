 import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [senha1, setSenha] = useState('');

  const handleSignin = () => {
    if (!email || !senha1) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const SigninData = { email, senha1 };
  
    fetch('http://172.17.5.106:5001/Signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SigninData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Credenciais inválidas');
        }
        return response.json(); 
      })
      .then(result => {
        console.log('Resultado da API:', result);
  
        if (result) {
          Alert.alert(result.message);
         
          navigation.navigate('Perfil', { user: result.user });
        } else {
          console.error('Erro: userId não encontrado no resultado:', result);
        }
  
        setEmail(''); 
        setSenha('');

        navigation.navigate('MainTabs', { screen: 'Home' });
      })


      
      .catch(error => {
        Alert.alert('Erro', error.message);
      });
  };
  const storeData = async (value, titulo) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(titulo, jsonValue);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

  
  const getData = async (titulo) => {
    try {
      const jsonValue = await AsyncStorage.getItem(titulo);
      setUsuario(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-Vindo(a)</Text>
      </animatable.View>

      <animatable.View animation='fadeInUp' style={styles.containerform}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail} 
        />

        <Text style={styles.title}>Senha</Text> 
        <TextInput
          placeholder="Digite sua senha..."
          style={styles.input}
          secureTextEntry={true}
          value={senha1} 
          onChangeText={setSenha} 
        />

        <TouchableOpacity style={styles.button} onPress={handleSignin}> 
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.RegisterText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonEsqueciSenha}>
          <Text style={styles.RegisterSenha}>Esqueci Minha Senha</Text>
        </TouchableOpacity>
      </animatable.View>
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
    fontSize: 28,
    fontWeight: 'bold', 
    color: '#000',
  },
  containerform: {
    backgroundColor: '#A9A9A9',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    margin: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#006400',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignItems: 'center',
  },
  RegisterText: {
    color: '#006400',
    fontWeight: 'bold',
  },
  buttonEsqueciSenha: {
    marginTop: 14,
    alignItems: 'center',
  },
  RegisterSenha: {
    color: '#006400',
    fontWeight: 'bold',
  }
});


  