import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NutriText from '../NutriText';
import colors from '../../styles/colors';
import propTypes from 'prop-types';

const FilterButton = (props) => {
    const [buttonColor, setButtonColor] = useState(colors.black);
    const [icon, setIcon] = useState(props.icon);

    // Toggle style
    useEffect(() => {
        if (props.pressed) {
            setButtonColor(colors.primary);
            const cutAt = props.icon.search('-outline');
            setIcon(props.icon.substring(0, cutAt));
        } else {
            setButtonColor(colors.black);
            setIcon(props.icon);
        }
    });

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <MaterialCommunityIcons name={icon} size={20} color={buttonColor} />
            <NutriText style={{ ...styles.text, color: buttonColor }}>
                {props.text}
            </NutriText>
        </TouchableOpacity>
    );
};

FilterButton.propTypes = {
    icon: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
    onPress: propTypes.func,
    pressed: propTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        hitSlop: 20,
        padding: 20,
    },
    text: {
        paddingLeft: 5,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default FilterButton;
