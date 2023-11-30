import { createStackNavigator } from '@react-navigation/stack'
import ListaCadastro from './ListaCadastro'
import FormCadastro from './FormCadastro'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCadastro' 
        >
            <Stack.Screen name='ListaCadastro' component={ListaCadastro} /> 
            <Stack.Screen name='FormCadastro' component={FormCadastro} />
        </Stack.Navigator>
    )
}
