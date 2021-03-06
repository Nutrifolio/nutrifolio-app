import * as SplashScreen from 'expo-splash-screen';
import ActivityIndicator from './components/ActivityIndicator';
import AppNavigator from './navigation/AppNavigator';
import AuthContext from './auth/authContext';
import AuthStorage from './auth/storage';
import AuthNavigator from './navigation/AuthNavigator';
import navigationTheme from './styles/navigationTheme';
import useLocation from './hooks/useLocation';
import UserContext from './auth/userContext';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

// Ignore Lottie deprecation warnings
LogBox.ignoreLogs([/ViewPropTypes/]);

export default function App() {
    const { location } = useLocation();
    const netInfo = useNetInfo();
    const [userInfo, setUserInfo] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [products, setProducts] = useState({ favorites: [], recents: [] });
    const [isLoaded, setIsLoaded] = useState(false);

    const restoreToken = async () => {
        const token = await AuthStorage.getToken();
        if (!token) return;
        setAccessToken(token);
    };

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while loading
                await SplashScreen.preventAutoHideAsync();
                // Get token from storage
                await restoreToken();
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell app to render
                setIsLoaded(true);
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, []);

    if (!isLoaded) {
        return null;
    } else if (!location) {
        // Wait for location to load
        return <ActivityIndicator visible={true} text='Loading Location...' />;
    } else if (netInfo.type === 'unknown' || !netInfo.isInternetReachable) {
        // Wait for internet connection
        return <ActivityIndicator visible={true} text='Connecting...' />;
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            <UserContext.Provider
                value={{
                    location,
                    userInfo,
                    products,
                    setProducts,
                    setUserInfo,
                }}
            >
                <NavigationContainer theme={navigationTheme}>
                    {accessToken ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}
