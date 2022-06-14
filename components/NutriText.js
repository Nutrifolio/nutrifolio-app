import React from 'react'
import { Text, ViewPropTypes } from "react-native"
import {
    useFonts,
    Rubik_400Regular,
    Rubik_600SemiBold,
    Rubik_700Bold,
} from '@expo-google-fonts/rubik'

const determineFont = (style) => {
    if (style) {
        if ("fontWeight" in style && style.fontWeight === "600") {
            return {
                ...style,
                fontFamily: "Rubik_600SemiBold",
            };
        } else if (
            "fontWeight" in style &&
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

/**
 * Use fontWeight style property to specify bold or semi-bold text
 */
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