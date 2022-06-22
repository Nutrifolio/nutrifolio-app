import React from 'react';
import NutriButton from './NutriButton';
import propTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const PrimaryButton = (props) => (
    <NutriButton
        onPress={props.onPress}
        text={props.text}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
    />
);

PrimaryButton.propTypes = {
    onPress: propTypes.func.isRequired,
    text: propTypes.string.isRequired,
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    textStyle: {
        color: colors.white,
        fontSize: 20,
    },
});

export default PrimaryButton;
