import propTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import NutriText from './NutriText';

const NutriLink = (props) => (
    <TouchableOpacity
        onPress={props.onPress}
        style={{ ...styles.container, ...props.style }}
    >
        <NutriText style={styles.text}>{props.text}</NutriText>
    </TouchableOpacity>
);

NutriLink.propTypes = {
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        hitSlop: 20,
        padding: 20,
    },
    text: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: colors.primary,
    },
});

export default NutriLink;
