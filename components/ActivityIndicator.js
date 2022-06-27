import LottieView from 'lottie-react-native';
import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import NutriText from './NutriText';

const ActivityIndicator = (props) => {
    if (!props.visible) return null;
    return (
        <View style={styles.overlay}>
            <LottieView
                autoPlay
                loop
                source={require('../assets/animations/loader.json')}
            />
            <NutriText style={styles.text}>{props.text}</NutriText>
        </View>
    );
};

ActivityIndicator.propTypes = {
    visible: propTypes.bool.isRequired,
    text: propTypes.string,
};

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        opacity: 0.8,
    },
    text: {
        paddingTop: 150, // TODO Don't use pixels
    },
});

export default ActivityIndicator;
