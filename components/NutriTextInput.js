import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../styles/colors';
import propTypes from 'prop-types';

const NutriTextInput = (props) => {
    const { iconName, placeholder, style, ...otherProps } = props;

    // Load font
    let [fontsLoaded] = useFonts({ Rubik_400Regular });
    let font = '';
    if (fontsLoaded) font = 'Rubik_400Regular';

    // Conditional rendering of icon
    let icon;
    if (iconName) {
        icon = (
            <MaterialCommunityIcons
                name={iconName}
                style={styles.icon}
                color={colors.black}
                size={style.fontSize + 5}
            />
        );
    } else {
        icon = null;
    }

    return (
        <View style={{ ...styles.container, ...style }}>
            {icon}

            <TextInput
                placeholder={placeholder}
                style={{
                    ...styles.textInput,
                    fontSize: style.fontSize,
                    fontFamily: font,
                }}
                selectionColor={colors.primary}
                {...otherProps}
            />
        </View>
    );
};

NutriTextInput.propTypes = {
    iconName: propTypes.string,
    placeholder: propTypes.string.isRequired,
    style: propTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'hidden',
    },
    icon: {
        paddingHorizontal: 10,
    },
    textInput: {
        width: '100%',
    },
});

export default NutriTextInput;
