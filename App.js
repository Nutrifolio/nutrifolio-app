import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import navigationTheme from './styles/navigationTheme';
import AuthContext from './auth/context';

export default function App() {
    const [accessToken, setAccessToken] = useState();

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            <NavigationContainer theme={navigationTheme}>
                {accessToken ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
