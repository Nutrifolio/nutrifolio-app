import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;