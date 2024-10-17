import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [N_Ap, setApartamento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const handleCadastro = () => {
    if (senha1 !== senha2) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    const data = {
      nome,
      sobrenome,
      email,
      telefone,
      cpf,
      cep,
      rua,
      numero,
      N_ap: N_Ap,
      bairro,
      cidade,
      estado,
      senha1,
      senha2,
      tipo_usuario: tipoUsuario,
    };
 
    console.log('Dados a serem enviados:', data); 

    fetch('http://192.168.0.06:5001/cadastro', {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log('Resposta status:', response.status); 
      if (!response.ok) {
        throw new Error('Erro ao realizar o cadastro');
      }
      return response.json();
    })
    .then(result => {
      if (result.message === 'Dados cadastrados com sucesso.') {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

        
        setNome('');
        setSobrenome('');
        setEmail('');
        setTelefone('');
        setCpf('');
        setCep('');
        setRua('');
        setNumero('');
        setApartamento('');
        setBairro('');
        setCidade('');
        setEstado('');
        setSenha1('');
        setSenha2('');
        setTipoUsuario('');

        
        navigation.navigate('Signin'); // ou Welcome tem que testar
      } else {
        Alert.alert('Erro', result.message || 'Erro ao realizar o cadastro');
      }
    })
    .catch(error => {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      console.error('Erro ao cadastrar:', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.message}>Novo Cadastro</Text>
      </View>

      <Text style={styles.title}>Tipo de Usuário</Text>
      <Picker
        selectedValue={tipoUsuario}
        onValueChange={(itemValue) => setTipoUsuario(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Síndico" value="sindico" />
        <Picker.Item label="Morador" value="morador" />
        <Picker.Item label="Porteiro" value="porteiro" />
      </Picker>

      <Text style={styles.title}>Nome</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" value={nome} onChangeText={setNome} />

      <Text style={styles.title}>Sobrenome</Text>
      <TextInput style={styles.input} placeholder="Digite seu sobrenome" value={sobrenome} onChangeText={setSobrenome} />

      <Text style={styles.title}>Email</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.title}>Telefone</Text>
      <TextInput style={styles.input} placeholder="Digite seu telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

      <Text style={styles.title}>CPF</Text>
      <TextInput style={styles.input} placeholder="Digite seu CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />

      <Text style={styles.title}>CEP</Text>
      <TextInput style={styles.input} placeholder="Digite seu CEP" value={cep} onChangeText={setCep} keyboardType="numeric" />

      <Text style={styles.title}>Rua</Text>
      <TextInput style={styles.input} placeholder="Digite seu endereço" value={rua} onChangeText={setRua} />

      <Text style={styles.title}>Número</Text>
      <TextInput style={styles.input} placeholder="Digite o número" value={numero} onChangeText={setNumero} keyboardType="numeric" />

      <Text style={styles.title}>Apartamento</Text>
      <TextInput style={styles.input} placeholder="Digite o apartamento" value={N_Ap} onChangeText={setApartamento} keyboardType="numeric" />

      <Text style={styles.title}>Bairro</Text>
      <TextInput style={styles.input} placeholder="Digite seu bairro" value={bairro} onChangeText={setBairro} />

      <Text style={styles.title}>Cidade</Text>
      <TextInput style={styles.input} placeholder="Digite sua cidade" value={cidade} onChangeText={setCidade} />

      <Text style={styles.title}>Estado</Text>
      <TextInput style={styles.input} placeholder="Digite seu estado" value={estado} onChangeText={setEstado} />

      <Text style={styles.title}>Senha</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" value={senha1} onChangeText={setSenha1} secureTextEntry={true} />

      <Text style={styles.title}>Confirme sua senha</Text>
      <TextInput style={styles.input} placeholder="Confirme sua senha" value={senha2} onChangeText={setSenha2} secureTextEntry={true} />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  containerHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
