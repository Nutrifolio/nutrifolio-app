import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation/AppNavigator';
import AuthContext from './auth/authContext';
import AuthNavigator from './navigation/AuthNavigator';
import AuthStorage from './auth/storage';
import navigationTheme from './styles/navigationTheme';
import UserContext from './auth/userContext';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import useLocation from './hooks/useLocation';
import ActivityIndicator from './components/ActivityIndicator';

export default function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [products, setProducts] = useState({ favorites: [], recents: [] });
    const { location } = useLocation();
    const [isLoaded, setIsLoaded] = useState(false);

    // Ignore Lottie deprecation warnings
    LogBox.ignoreLogs([/ViewPropTypes/]);

    const restoreToken = async () => {
        const token = await AuthStorage.getToken();
        if (!token) return;
        setAccessToken(token);
    };

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Get token from storage
                await restoreToken();
                // TODO Add waiting for location
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setIsLoaded(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isLoaded) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setIsLoaded`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            <UserContext.Provider value={{ location, products, setProducts }}>
                <NavigationContainer
                    theme={navigationTheme}
                    onReady={onLayoutRootView}
                >
                    {accessToken ? (
                        location ? ( // Temporary solution for getting location
                            <AppNavigator />
                        ) : (
                            <ActivityIndicator
                                visible={true}
                                text={'Loading Location'}
                            />
                        )
                    ) : (
                        <AuthNavigator />
                    )}
                </NavigationContainer>
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}
