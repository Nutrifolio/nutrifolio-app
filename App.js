import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import navigationTheme from './styles/navigationTheme';

export default function App() {
    return (
        <NavigationContainer theme={navigationTheme}>
            <AuthNavigator />
        </NavigationContainer>
    );
}
