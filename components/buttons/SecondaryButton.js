import React from 'react'
import NutriButton from './NutriButton'
import propTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import colors from '../../styles/colors'

const SecondaryButton = (props) =>
        <NutriButton 
            onPress={props.onPress}
            text={props.text} 
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
        />

SecondaryButton.propTypes = {
    onPress: propTypes.func.isRequired,
    text: propTypes.string.isRequired
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    textStyle: {
        color: colors.primary,
        fontSize: 20
    }
})

export default SecondaryButton;