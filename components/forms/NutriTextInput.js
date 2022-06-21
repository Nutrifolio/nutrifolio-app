import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native';
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/colors';
import propTypes from 'prop-types';

const NutriTextInput = ({iconName, placeholder, style, ...otherProps}) => {
    // Load font
    let [fontsLoaded] = useFonts({ Rubik_400Regular });
    let font = '';
    if (fontsLoaded) font = 'Rubik_400Regular';

    // Conditional rendering of icon
    let icon;
    if (iconName) {
        icon = <MaterialCommunityIcons 
                    name={iconName} 
                    style={styles.icon}
                    color={colors.black}
                    size={16}
                />

    } else {
        icon = null
    }

    return (
        <View style={{...styles.container, ...style}}>

            {icon}

            <TextInput 
                placeholder={placeholder}
                style={{...styles.textInput, fontFamily: font}}
                selectionColor={colors.primary}
                {...otherProps}
            />

        </View>
    )
}

NutriTextInput.propTypes = ({
    iconName: propTypes.string,
    placeholder: propTypes.string,
    style: propTypes.object
})

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'hidden'
    },
    icon: {
        paddingHorizontal: 10
    },
    textInput: {
        width: '100%',
        fontSize: 16,
    }
})

export default NutriTextInput;