import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import propTypes from 'prop-types';
import NutriButtonIcon from './NutriButtonIcon';

const FilterButton = (props) => {
    const [buttonColor, setButtonColor] = useState(colors.black);
    const [icon, setIcon] = useState(props.icon);

    // Toggle style
    useEffect(() => {
        if (props.pressed) {
            setButtonColor(colors.primary);
            setIcon(props.iconFilled);
        } else {
            setButtonColor(colors.black);
            setIcon(props.icon);
        }
    });

    return (
        <NutriButtonIcon
            text={props.text}
            icon={icon}
            style={{ ...styles.content, color: buttonColor }}
            containerStyle={styles.container}
            onPress={props.onPress}
        />
    );
};

FilterButton.propTypes = {
    icon: propTypes.string.isRequired,
    iconFilled: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
    pressed: propTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        hitSlop: 20,
        padding: 20,
    },
    content: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default FilterButton;
