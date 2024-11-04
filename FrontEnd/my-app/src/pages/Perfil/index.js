import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import { URL_API } from '../../utils/api-utils';

const ProfileScreen = () => {
  const { userData, setUserData } = useUser();
  const [editableData, setEditableData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userData) {
      setEditableData(userData);
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      await axios.put(URL_API + '/perfil', editableData);
      setUserData(editableData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!editableData) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TextInput
        style={styles.input}
        value={editableData.nome}
        onChangeText={(text) => setEditableData({ ...editableData, nome: text })}
        editable={isEditing}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={editableData.sobrenome}
        onChangeText={(text) => setEditableData({ ...editableData, sobrenome: text })}
        editable={isEditing}
        placeholder="Sobrenome"
      />
      <TextInput
        style={styles.input}
        value={editableData.telefone}
        onChangeText={(text) => setEditableData({ ...editableData, telefone: text })}
        editable={isEditing}
        placeholder="Telefone"
      />
      <TextInput
        style={styles.input}
        value={editableData.endereco}
        onChangeText={(text) => setEditableData({ ...editableData, endereco: text })}
        editable={isEditing}
        placeholder="Endereço Completo"
      />
      <TouchableOpacity
        style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      >
        <Text style={styles.buttonText}>{isEditing ? "Salvar" : "Editar"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#696969', 
  },
  saveButton: {
    backgroundColor: '#006400', 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default ProfileScreen;
