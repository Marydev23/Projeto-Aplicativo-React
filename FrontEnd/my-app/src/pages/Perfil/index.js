import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import URL_API from '../../utils/api-utils';
import { useRoute } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

export default function Perfil() {
  const [usuario, setUsuario] = useState({
    nomeCompleto: '',
    endereco: '',
    telefone: '',
    imagemPerfil: require('../../assets/perfil.png'), 
  });

  const route = useRoute();
  var user = route.params.Perfil.user;
  console.log(user)

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(URL_API + `/perfil/${userId}`);
        const data = await response.json();
        
        console.log(data); 

        if (response.ok) {
          console.log('Nome:', data.nome); 
          console.log('Sobrenome:', data.sobrenome); 
          setUsuario({
            nomeCompleto: data.nome_completo || `${data.nome} ${data.sobrenome}`, // Ajustar conforme a estrutura da API
            endereco: data.endereco,
            telefone: data.telefone,
            imagemPerfil: data.imagemPerfil ? { uri: data.imagemPerfil } : require('../../assets/perfil.png'), 
          });
        } else {
          console.error('Erro ao obter dados do usuário:', data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchUsuario();
  }, [userId]);

  if (!usuario.nomeCompleto) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil do Usuário</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={usuario.imagemPerfil} style={styles.profileImage} />
        <Text style={styles.profileName}>{usuario.nomeCompleto}</Text>
        <Text style={styles.profileInfo}>Endereço: {usuario.endereco}</Text>
        <Text style={styles.profileInfo}>Telefone: {usuario.telefone}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  profileInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#006400',
    borderRadius: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
