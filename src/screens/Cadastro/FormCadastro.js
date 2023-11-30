import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';
export default function FormCadastro({ route }) {
  const navigation = useNavigation();
  const { acao, cadastro: cadastroAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [filho, setFilho] = useState('');
  const [curso, setCurso] = useState('');
  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    if (cadastroAntigo) {
      setNome(cadastroAntigo.nome);
      setMatricula(cadastroAntigo.cpf);
      setFilho(cadastroAntigo.filho);
      setCurso(cadastroAntigo.curso);
    }
  }, [cadastroAntigo]);


  
useEffect(() => {
    const code = mask(cpf, "999.999.999-99")
    setCpf(code)
}, [cpf])


  function salvar() {
    if (nome === '' || cpf === '' || filho === '' || curso === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const cadastroNovo = {
        nome: nome,
        cpf: cpf,
        filho: filho,
        curso: curso,
      };

      if (cadastroAntigo) {
        acao(cadastroAntigo, cadastroNovo);
      } else {
        acao(cadastroNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'cadastro salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {cadastroAntigo ? 'Editar cadastro' : 'Adicionar cadastro'}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={'Nome'}
          mode="outlined"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          label={'CPF'}
          mode="outlined"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
        />
        <TextInput
          style={styles.input}
          label={' Nome do filho'}
          mode="outlined"
          value={filho}
          onChangeText={(text) => setFilho(text)}
        />
        <TextInput
          style={styles.input}
          label={'Nome do curso'}
          mode="outlined"
          value={curso}
          onChangeText={(text) => setCurso(text)}
        />
        {showMensagemErro && (
          <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="contained-tonal" onPress={() => navigation.goBack()}>
          Voltar
        </Button>
        <Button style={styles.button} mode="contained" onPress={salvar}>
          Salvar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    width: '90%',
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
});
