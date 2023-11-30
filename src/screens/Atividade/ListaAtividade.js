import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaCadastro() {
  const navigation = useNavigation();
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    async function carregarAtividades() {
      try {
        const atividadesSalvos = await AsyncStorage.getItem('atividades');
        if (atividadesSalvos) {
          setCadastros(JSON.parse(atividadesSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      }
    }

    carregarAtividades();
  }, []);

  async function adicionarAtividade(atividadeNovo) {
    const novaListaAtividades = [...atividades, atividadeNovo];

    await AsyncStorage.setItem('atividades', JSON.stringify(novaListaAtividades));
    setAtividades(novaListaAtividades);
    Toast.show({
      type: 'success',
      text1: 'atividade feito com sucesso!',
    });
  }

  async function excluirAtividade(atividade) {
    const novaListaAtividades = atividades.filter((atividadeItem) => atividadeItem !== atividade);

    await AsyncStorage.setItem('atividades', JSON.stringify(novaListaAtividades));
    setCadastros(novaListaAtividades);
    Toast.show({
      type: 'success',
      text1: 'Atividade excluído com sucesso!',
    });
  }

  async function editarAtividade(atividadeAntigo, atividadeNovo) {
    const novaListaAtividades = atividades.map((atividade) =>
      atividade === atividadeAntigo ? { ...atividade, ...atividadeNovo } : atividade
    );

    await AsyncStorage.setItem('atividades', JSON.stringify(novaListaAtividades));
    setCadastros(novaListaAtividades);
    Toast.show({
      type: 'success',
      text1: 'Atividade editado com sucesso!',
    });
    navigation.goBack(); 
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Atividades
      </Text>
      <FlatList
        style={styles.list}
        data={atividades}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome da atividade: {item?.nome}</Text>
                <Text variant="bodyLarge">Local: {item?.local }</Text>
                <Text variant="bodyLarge">Horario: {item?.horario}</Text>
    
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormAtividade', {
                    acao: (atividadeAntigo, atividadeNovo) => editarAtividade(item, atividadeAntigo, atividadeNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirAtividade(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormAtividade', { acao: adicionarAtividade })}
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
