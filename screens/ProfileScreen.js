import colors from '../styles/colors';
import NutriText from '../components/NutriText';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Screen from '../components/Screen';
import useAuth from '../hooks/useAuth';
import userContext from '../auth/userContext';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

const accountTitle = 'Account';
const pageIs = 'Page is';
const wip = 'Under Development';
const infoTitles = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
};

const ProfileScreen = () => {
    const { userInfo } = useContext(userContext);
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
                <View>
                    <View style={styles.infoRow}>
                        <NutriText>{infoTitles.firstName}</NutriText>
                        <NutriText>{userInfo.first_name}</NutriText>
                    </View>
                    <View style={styles.infoRow}>
                        <NutriText>{infoTitles.lastName}</NutriText>
                        <NutriText>{userInfo.last_name}</NutriText>
                    </View>
                    <View style={styles.infoRow}>
                        <NutriText>{infoTitles.email}</NutriText>
                        <NutriText>{userInfo.email}</NutriText>
                    </View>
                </View>
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
    infoRow: {
        borderBottomWidth: 0.3,
        borderBottomColor: colors.grey,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
