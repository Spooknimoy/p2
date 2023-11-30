import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';

export default function FormProfessor({ route }) {
    const navigation = useNavigation();
    const { acao, cadastro: cadastroAntigo } = route.params;

    const [nome, setNome] = useState('');
    const [formacao, setFormacao] = useState('');
    const [materia, setMateria] = useState('');
    const [matricula, setMatricula] = useState('');

    const [showMensagemErro, setShowMensagemErro] = useState(false);

    useEffect(() => {
        if (cadastroAntigo) {
            setNome(cadastroAntigo.nome);
            setMateria(cadastroAntigo.materia);
            setFormacao(cadastroAntigo.formacao);
            setMatricula(cadastroAntigo.matricula);

        }
    }, [cadastroAntigo]);
// mascara
    useEffect(() => {
        const code = mask(matricula, "99999999999")
        setMatricula(code)
    }, [matricula])

    function salvar() {
        if (nome === '' || materia === '' || formacao === '') {
            setShowMensagemErro(true);
        } else {
            setShowMensagemErro(false);

            const cadastroNovo = {
                nome: nome,
                materia: materia,
                matricula: matricula,
                formacao: formacao,

            };

            if (cadastroAntigo) {
                acao(cadastroAntigo, cadastroNovo);
            } else {
                acao(cadastroNovo);
            }

            Toast.show({
                type: 'success',
                text1: 'Professor salvo com sucesso!',
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
                    label={'Matricula do professor'}
                    mode="outlined"
                    keyboardType='numeric'
                    value={matricula}
                    onChangeText={(text) => setMatricula(text)}
                />
                <TextInput
                    style={styles.input}
                    label={'Formação'}
                    mode="outlined"
                    keyboardType="text"
                    value={formacao}
                    onChangeText={(text) => setFormacao(text)}
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
