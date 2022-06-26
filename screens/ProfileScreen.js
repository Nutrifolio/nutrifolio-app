import React from 'react';
import useAuth from '../hooks/useAuth';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

import Screen from '../components/Screen';
import NutriText from '../components/NutriText';
import PrimaryButton from '../components/buttons/PrimaryButton';

const accountTitle = 'Account';
const pageIs = 'Page is';
const wip = 'Under Development';

const ProfileScreen = () => {
    const { logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    };

    return (
        <Screen>
            <View style={styles.overlay}>
                <NutriText style={styles.pageIs}>{pageIs}</NutriText>
                <NutriText style={styles.wipText}>{wip}</NutriText>
            </View>
            <View style={styles.container}>
                <NutriText style={styles.title}>{accountTitle}</NutriText>
            </View>
            <View style={styles.bottom}>
                <PrimaryButton text='Log out' onPress={handleLogOut} />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
    },
    overlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        alignItems: 'center',
    },
    wipText: {
        color: colors.black,
        fontSize: 30,
        fontWeight: 'bold',
    },
    pageIs: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: 'bold',
    },
    bottom: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        zIndex: 2,
    },
});

export default ProfileScreen;
