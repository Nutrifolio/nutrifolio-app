import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import NutriButtonIcon from './buttons/NutriButtonIcon';
import propTypes from 'prop-types';
import colors from '../styles/colors';

const FilterHeader = (props) => {
    const [icon, setIcon] = useState('plus');
    useEffect(() => {
        if (props.pressed) {
            setIcon('minus');
        } else {
            setIcon('plus');
        }
    }, [props.pressed]);

    return (
        <NutriButtonIcon
            icon={icon}
            text={props.text}
            style={styles.filter}
            containerStyle={styles.filterContainer}
            onPress={props.onPress}
        />
    );
};

FilterHeader.propTypes = {
    pressed: propTypes.bool.isRequired,
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
    filterContainer: {
        backgroundColor: colors.lightGrey,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filter: {
        fontSize: 18,
        color: colors.black,
    },
});

export default FilterHeader;
