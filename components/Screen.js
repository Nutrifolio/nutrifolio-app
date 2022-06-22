import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import propTypes from 'prop-types';

const Screen = (props) => {
    return <SafeAreaView style={styles.screen}>{props.children}</SafeAreaView>;
};

Screen.propTypes = {
    children: propTypes.node,
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default Screen;
