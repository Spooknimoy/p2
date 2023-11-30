import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function FormMateria({ route }) {
  const navigation = useNavigation();
  const { acao, materia : materiaAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [materia, setMateria] = useState('');
  
  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    if (materiaAntigo) {
      setNome(materiaAntigo.nome);
      setMateria(materiaAntigo.materia);
      setDuracao(materiaAntigo.formacao);
      
    }
  }, [materiaAntigo]);

  function salvar() {
    if (nome === '' || materia === '' || duracao === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const materiaNovo = {
        nome: nome,
        materia: materia,
        duracao: duracao,

      };

      if (materiaAntigo) {
        acao(materiaAntigo, materiaNovo);
      } else {
        acao(materiaNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'materia  salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {materiaAntigo ? 'Editar materia ' : 'Adicionar materia '}
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
          label={'Duração'}
          mode="outlined"
          keyboardType="text"
          value={duracao}
          onChangeText={(text) => setDuracao(text)}
        />
        <TextInput
          style={styles.input}
          label={'Materia'}
          mode="outlined"
          value={materia}
          onChangeText={(text) => setMateria(text)}
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
