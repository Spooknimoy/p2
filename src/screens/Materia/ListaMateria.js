import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaProfessor() {
  const navigation = useNavigation();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    async function carregarMaterias() {
      try {
        const materiasSalvos = await AsyncStorage.getItem('materias');
        if (materiasSalvos) {
          setMaterias(JSON.parse(materiasSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar materias:', error);
      }
    }

    carregarMaterias();
  }, []);

  async function adicionarMateria(MateriaNovo) {
    const novaListaMaterias = [...materias, MateriaNovo];

    await AsyncStorage.setItem('materias', JSON.stringify(novaListaMaterias));
    setMaterias(novaListaMaterias);
    Toast.show({
      type: 'success',
      text1: 'Materia feito com sucesso!',
    });
  }

  async function excluirMateria(materia) {
    const novaListaMaterias = materias.filter((materiaItem) => materiaItem !== materia);

    await AsyncStorage.setItem('materias', JSON.stringify(novaListaMaterias));
    setMaterias(novaListaMaterias);
    Toast.show({
      type: 'success',
      text1: 'Materia excluído com sucesso!',
    });
  }

  async function editarMateria(materiaAntigo, materiaNovo) {
    const novaListaMaterias = materias.map((materia) =>
      materia === materiaAntigo ? { ...materia, ...materiaNovo } : materia
    );

    await AsyncStorage.setItem('materias', JSON.stringify(novaListaMaterias));
    setMaterias(novaListaMaterias);
    Toast.show({
      type: 'success',
      text1: 'Materia editado com sucesso!',
    });
    navigation.goBack(); 
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de materias
      </Text>
      <FlatList
        style={styles.list}
        data={materias}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="bodyLarge">Materia: {item?.materia }</Text>
                <Text variant="bodyLarge">Duração: {item?.duracao }</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormMateria', {
                    acao: (materiaAntigo, materiaNovo) => editarMateria(item, materiaAntigo, materiaNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirMateria(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormMateria', { acao: adicionarMateria })}
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
