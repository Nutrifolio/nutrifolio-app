import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import propTypes from 'prop-types';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProductScreen from '../screens/ProductScreen';
import StoreScreen from '../screens/StoreScreen';

const Stack = createStackNavigator();

const ScreenNavigator = (props) => {
    return (
        <Stack.Navigator
            initialRouteName={props.firstScreenName}
            screenOptions={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
            }}
        >
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='ProductScreen' component={ProductScreen} />
            <Stack.Screen name='StoreScreen' component={StoreScreen} />
        </Stack.Navigator>
    );
};

ScreenNavigator.propTypes = {
    firstScreenName: propTypes.string,
};

export const HomeNavigator = () => {
    return <ScreenNavigator firstScreenName='HomeScreen' />;
};

export const SearchNavigator = () => {
    return <ScreenNavigator firstScreenName='SearchScreen' />;
};
