import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Screen from '../components/Screen';

const ProfileScreen = () => {
    return (
        <Screen>
            <View style={styles.container}>
                <Text>ProfileScreen</Text>
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
    }
})

export default ProfileScreen;