import React from 'react';
import { StyleSheet, View } from 'react-native';
import propTypes from 'prop-types';
import Screen from '../components/Screen';
import NutriText from '../components/NutriText';

const HomeScreen = () => {
    const welcomeMessage = 'Welcome back,';
    const username = 'John';
    return (
        <Screen>
            <View style={styles.container}>
                <NutriText style={styles.welcome}>{welcomeMessage}</NutriText>
                <NutriText style={styles.username}>{username}</NutriText>
            </View>
        </Screen>
    );
};

HomeScreen.propTypes = {
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {},
    username: {},
});

export default HomeScreen;
