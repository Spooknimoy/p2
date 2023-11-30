import { createStackNavigator } from '@react-navigation/stack'
import ListaAtividade from './ListaAtividade'
import FormAtividade from './FormAtividade'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaAtividade' 
        >
            <Stack.Screen name='ListaAtividade' component={ListaAtividade} /> 
            <Stack.Screen name='FormAtividade' component={FormAtividade} />
        </Stack.Navigator>
    )
}
