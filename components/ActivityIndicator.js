import LottieView from 'lottie-react-native';
import propTypes from 'prop-types';
import React from 'react';

const ActivityIndicator = (props) => {
    if (!props.visible) return null;
    return (
        <LottieView
            autoPlay
            loop
            source={require('../assets/animations/loader.json')}
        />
    );
};

ActivityIndicator.propTypes = {
    visible: propTypes.bool,
};

export default ActivityIndicator;
