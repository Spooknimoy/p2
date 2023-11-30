import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function FormAtividade({ route }) {
  const navigation = useNavigation();
  const { acao, atividade: atividadeAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [horario, setHorario] = useState('');
  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    if (atividadeAntigo) {
      setNome(atividadeAntigo.nome);
      setLocal(atividadeAntigo.local);
      setHorario(atividadeAntigo.horario);
    }
  }, [atividadeAntigo]);

  function salvar() {
    if (nome === '' || local === '' || horario === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const atividadeNovo = {
        nome: nome,
        local: local,
        horario: horario,
      };

      if (atividadeAntigo) {
        acao(atividadeAntigo, atividadeNovo);
      } else {
        acao(atividadeNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'atividade salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {atividadeAntigo ? 'Editar atividade' : 'Adicionar atividade'}
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
          label={'Horario'}
          mode="outlined"
          keyboardType="numeric"
          value={horario}
          onChangeText={(text) => setHorario(text)}
        />
        <TextInput
          style={styles.input}
          label={'local'}
          mode="outlined"
          value={local}
          onChangeText={(text) => setLocal(text)}
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
