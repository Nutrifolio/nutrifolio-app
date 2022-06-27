import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import NutriText from './NutriText';
import colors from '../styles/colors';

const message = 'No Internet Connection';

const OfflineNotice = () => (
    <SafeAreaView style={styles.container}>
        <NutriText style={styles.text}>{message}</NutriText>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
    text: {
        color: colors.white,
    },
});

export default OfflineNotice;
