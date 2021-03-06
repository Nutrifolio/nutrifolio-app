import React from 'react';
import { Text } from 'react-native';
import propTypes from 'prop-types';
import {
    useFonts,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
} from '@expo-google-fonts/rubik';

const determineFont = (style) => {
    if (style) {
        if ('fontWeight' in style && style.fontWeight === '600') {
            return {
                ...style,
                fontFamily: 'Rubik_600SemiBold',
            };
        } else if (
            'fontWeight' in style &&
            (style.fontWeight === 'bold' || style.fontWeight === '700')
        ) {
            return {
                ...style,
                fontFamily: 'Rubik_700Bold',
            };
        } else {
            return { ...style, fontFamily: 'Rubik_500Medium' };
        }
    }
};

/**
 * Use fontWeight style property to specify bold or semi-bold text
 */
const NutriText = (props) => {
    let [fontsLoaded] = useFonts({
        Rubik_500Medium,
        Rubik_600SemiBold,
        Rubik_700Bold,
    });

    // Display default fonts
    if (!fontsLoaded) {
        return <Text style={props.style}>{props.children}</Text>;
    }

    return (
        <Text
            numberOfLines={props.numberOfLines ? props.numberOfLines : 0}
            style={determineFont(props.style)}
        >
            {props.children}
        </Text>
    );
};

NutriText.propTypes = {
    style: propTypes.object,
    children: propTypes.string,
    numberOfLines: propTypes.number,
};

export default NutriText;
