import React from 'react';
import useAuth from '../hooks/useAuth';
import { StyleSheet, Text, View, Button } from 'react-native';

import Screen from '../components/Screen';

const ProfileScreen = () => {
    const { logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    };

    return (
        <Screen>
            <View style={styles.container}>
                <Text>ProfileScreen</Text>
                <Button title='Log out' onPress={handleLogOut} />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfileScreen;
