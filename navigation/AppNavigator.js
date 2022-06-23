import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import { HomeNavigator, SearchNavigator } from './ScreenNavigators';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Rubik_500Medium } from '@expo-google-fonts/rubik';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    let [fontsLoaded] = useFonts({ Rubik_500Medium });

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: fontsLoaded
                    ? { fontFamily: 'Rubik_500Medium' }
                    : {},
                tabBarActiveTintColor: colors.primary,
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='home'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Search'
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='magnify'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='account'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
