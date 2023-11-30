import { createStackNavigator } from '@react-navigation/stack'

import FormProfessor from '../Professor/FormProfessor'
import ListaProfessor from '../Professor/ListaProfessor'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaProfessor' 
        >
            <Stack.Screen name='ListaProfessor' component={ListaProfessor} /> 
            <Stack.Screen name='FormProfessor' component={FormProfessor} />
        </Stack.Navigator>
    )
}
