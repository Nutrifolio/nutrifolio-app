import LottieView from 'lottie-react-native';
import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

const ActivityIndicator = (props) => {
    if (!props.visible) return null;
    return (
        <View style={styles.overlay}>
            <LottieView
                autoPlay
                loop
                source={require('../assets/animations/loader.json')}
            />
        </View>
    );
};

ActivityIndicator.propTypes = {
    visible: propTypes.bool,
};

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        position: 'absolute',
        zIndex: 1,
        opacity: 0.8,
    },
});

export default ActivityIndicator;
