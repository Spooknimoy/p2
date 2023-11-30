import { createStackNavigator } from '@react-navigation/stack'

import FormMateria from './FormMateria'
import ListaMateria from './ListaMateria'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaProfessor' 
        >
            <Stack.Screen name='ListaMateria' component={ListaMateria} /> 
            <Stack.Screen name='FormMateria' component={FormMateria} />
        </Stack.Navigator>
    )
}
