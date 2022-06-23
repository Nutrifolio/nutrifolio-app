import React from 'react';
import NutriText from '../NutriText';
import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import propTypes from 'prop-types';

const ErrorMessage = (props) => {
    if (!props.visible || !props.error) return null;

    return <NutriText style={styles.error}>{props.error}</NutriText>;
};

ErrorMessage.propTypes = {
    error: propTypes.string.isRequired,
    visible: propTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    error: { color: colors.error },
});

export default ErrorMessage;
