import React from 'react';
import { StyleSheet, View } from 'react-native';
import propTypes from 'prop-types';
import Screen from '../components/Screen';
import NutriText from '../components/NutriText';
import colors from '../styles/colors';

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
        paddingHorizontal: 20,
        paddingTop: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 28,
        color: colors.black,
    },
    username: {
        fontSize: 28,
        color: colors.primary,
    },
});

export default HomeScreen;
