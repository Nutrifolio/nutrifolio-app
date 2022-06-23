import React from 'react';
import NutriButton from './NutriButton';
import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import propTypes from 'prop-types';

const TextButton = (props) => (
    <NutriButton
        text={props.text}
        textStyle={{ ...styles.text, ...props.textStyle }}
        onPress={props.onPress}
    />
);

TextButton.propTypes = {
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
    textStyle: propTypes.object,
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: colors.black,
    },
});

export default TextButton;
