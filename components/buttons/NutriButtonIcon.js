import { MaterialCommunityIcons } from '@expo/vector-icons';
import propTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import NutriText from '../NutriText';

const NutriButtonIcon = (props) => {
    return (
        <TouchableOpacity style={props.containerStyle} onPress={props.onPress}>
            <MaterialCommunityIcons
                name={props.icon}
                style={{ ...props.style, fontSize: props.style.fontSize + 5 }}
            />
            <NutriText style={{ ...props.style, ...styles.text }}>
                {props.text}
            </NutriText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        paddingLeft: 5,
    },
});

NutriButtonIcon.propTypes = {
    containerStyle: propTypes.object.isRequired,
    style: propTypes.object.isRequired,
    icon: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
};

export default NutriButtonIcon;
