import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaCadastro() {
  const navigation = useNavigation();
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    async function carregarCadastros() {
      try {
        const cadastrosSalvos = await AsyncStorage.getItem('cadastros');
        if (cadastrosSalvos) {
          setCadastros(JSON.parse(cadastrosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar cadastros:', error);
      }
    }

    carregarCadastros();
  }, []);

  async function adicionarCadastro(cadastroNovo) {
    const novaListaCadastros = [...cadastros, cadastroNovo];

    await AsyncStorage.setItem('cadastros', JSON.stringify(novaListaCadastros));
    setCadastros(novaListaCadastros);
    Toast.show({
      type: 'success',
      text1: 'Cadastro feito com sucesso!',
    });
  }

  async function excluirCadastro(cadastro) {
    const novaListaCadastros = cadastros.filter((cadastroItem) => cadastroItem !== cadastro);

    await AsyncStorage.setItem('cadastros', JSON.stringify(novaListaCadastros));
    setCadastros(novaListaCadastros);
    Toast.show({
      type: 'success',
      text1: 'Cadastro excluído com sucesso!',
    });
  }

  async function editarCadastro(cadastroAntigo, cadastroNovo) {
    const novaListaCadastros = cadastros.map((cadastro) =>
      cadastro === cadastroAntigo ? { ...cadastro, ...cadastroNovo } : cadastro
    );

    await AsyncStorage.setItem('cadastros', JSON.stringify(novaListaCadastros));
    setCadastros(novaListaCadastros);
    Toast.show({
      type: 'success',
      text1: 'Cadastro editado com sucesso!',
    });
    navigation.goBack(); 
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Cadastros
      </Text>
      <FlatList
        style={styles.list}
        data={cadastros}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="bodyLarge">Cpf: {item?.cpf }</Text>
                <Text variant="bodyLarge">Filho: {item?.filho }</Text>
                <Text variant="bodyLarge">Curso: {item?.curso }</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormCadastro', {
                    acao: (cadastroAntigo, cadastroNovo) => editarCadastro(item, cadastroAntigo, cadastroNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirCadastro(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormCadastro', { acao: adicionarCadastro })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    backgroundColor: 'red',
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
});
