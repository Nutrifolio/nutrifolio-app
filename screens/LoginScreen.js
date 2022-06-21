import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PrimaryButton from '../components/buttons/PrimaryButton';
import NutriText from '../components/NutriText';
import routes from '../navigation/routes'

import Screen from '../components/Screen';
import colors from '../styles/colors';

const LoginScreen = (props) => {
    return (
        <Screen>
            <View style={styles.container}>
                <NutriText style={styles.title}>Welcome Back</NutriText>
                <PrimaryButton text='Log in' onPress={() => {}} />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: colors.primary,
        fontWeight: 'bold'
    }
})

export default LoginScreen;