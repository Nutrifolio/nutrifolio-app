import React from 'react';
import NutriButton from './NutriButton';
import propTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const SmallButton = (props) => (
    <NutriButton
        onPress={props.onPress}
        text={props.text}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
    />
);

SmallButton.propTypes = {
    onPress: propTypes.func.isRequired,
    text: propTypes.string.isRequired,
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    textStyle: {
        color: colors.primary,
        fontSize: 14,
    },
});

export default SmallButton;
