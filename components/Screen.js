import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const Screen = (props) => {
    return (
        <SafeAreaView style={styles.screen}>
            {props.children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    }
})

export default Screen;