import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import propTypes from 'prop-types';

const Stack = createStackNavigator();

const ScreenNavigator = (props) => {
    return (
        <Stack.Navigator
            initialRouteName={props.startPageName}
        >
            <Stack.Screen name="Home"/>
        </Stack.Navigator>
    );
};

ScreenNavigator.propTypes = {
    startPageName: propTypes.string
}


export default ScreenNavigator;