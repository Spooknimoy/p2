
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackCadastro from '../screens/Cadastro/StackCadastro'
import StackAlunos from '../screens/Alunos/StackAlunos'
import StackAtividade from '../screens/Atividade/StackAtividade'
import StackProfessor from '../screens/Professor/StackProfessor'
import StackMateria from '../screens/Materia/StackMateria'
const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Alunos'>
            <Drawer.Screen name="Cadastro" component={StackCadastro} />
            <Drawer.Screen name="Alunos" component={StackAlunos} />
            <Drawer.Screen name="Atividade" component={StackAtividade} />
            <Drawer.Screen name="Professor" component={StackProfessor} />
            <Drawer.Screen name="Materia" component={StackMateria} />
           
        </Drawer.Navigator>

    )
}