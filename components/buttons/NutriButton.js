import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import NutriText from '../NutriText'
import propTypes from 'prop-types'

const NutriButton = (props) => 
    <TouchableOpacity style={props.buttonStyle} onPress={props.onPress}>
        <NutriText style={props.textStyle}>
            {props.text}
        </NutriText>
    </TouchableOpacity>

// TODO Replace TouchableOpacity with more future-proof Pressable

NutriButton.propTypes = {
    buttonStyle: propTypes.object.isRequired,
    textStyle: propTypes.object.isRequired,
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired
}

export default NutriButton;