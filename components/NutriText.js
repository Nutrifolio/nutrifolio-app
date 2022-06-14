import React from 'react'
import { Text, ViewPropTypes } from "react-native"
import propTypes from 'prop-types';
import {
    useFonts,
    Rubik_400Regular,
    Rubik_600SemiBold,
    Rubik_700Bold,
} from '@expo-google-fonts/rubik'

const determineFont = (style) => {
    if (style) {
        if (style.hasOwnProperty("fontWeight") && style.fontWeight === "600") {
            return {
                ...style,
                fontFamily: "Rubik_600SemiBold",
            };
        } else if (
            style.hasOwnProperty("fontWeight") &&
            (style.fontWeight === "bold" || style.fontWeight === "700")
        ) {
            return {
                ...style,
                fontFamily: "Rubik_700Bold",
            };
        } else {
            return { ...style, fontFamily: "Rubik_400Regular" };
        }
    }
};

const NutriText = (props) => {
    let [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_600SemiBold,
        Rubik_700Bold,
    });

    // Display default fonts
    if (!fontsLoaded) {
        return <Text style={props.style}>{props.children}</Text>;
    }

    return <Text style={determineFont(props.style)}>{props.children}</Text>;
};

NutriText.propTypes = {
    style: ViewPropTypes.style,
    children: ViewPropTypes.children
}

export default NutriText;