import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>

      
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>Sobre</Text>
        <Text style={styles.aboutText}>Aplicativo de Gestão de Entregas</Text>
        <Text style={styles.aboutText}>Versão: 1.0.0</Text>
        <Text style={styles.aboutText}>Desenvolvido por:</Text>
        <Text style={styles.aboutText}>Marilza de Souza Santos</Text>
        <Text style={styles.aboutText}>Matheus Felipe Braga de Souza</Text>
        <Text style={styles.aboutText}>Juliano Fernandes Teodoro</Text>

        <Text style={styles.aboutText}>Matéria: Programacao Dispositivos Moveis Em Android</Text>
      </View>

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
  aboutSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
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
