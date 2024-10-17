import React from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import * as animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';



export default function Welcome() {
  const navigation = useNavigation ();
  return (
    <View style={styles.container}>
      <View style={styles.containerlogo}> 
        <animatable.Image 
        animation='flipInY'
          source={require('../../assets/logo.png')}
          style={{width: '100%'}}
          resizeMode="contain"
        />
      </View>

      <animatable.View delay ={600}animation="fadeInUp" style={styles.containerform}>
        <Text style={styles.title}>Sua encomenda na palma da sua mão!</Text>
        <TouchableOpacity

      
        style={styles.button}
        onPress={() => navigation.navigate('Signin')} 
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

      </animatable.View >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  containerlogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerform: {
    flex: 1, 
    backgroundColor: '#A9A9A9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 18,
  },
  text: {
    color: '#A1A1A1',
    marginBottom: 20, 
  },
  button: {
    backgroundColor: '#006400',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});
