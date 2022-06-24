import { StyleSheet, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import colors from '../styles/colors';
import propTypes from 'prop-types';

const NutriSlider = (props) => {
    return (
        <View style={styles.container}>
            <MultiSlider
                trackStyle={styles.trackStyle}
                markerContainerStyle={styles.markerContainerStyle}
                enableLabel={true}
                min={0}
                max={props.max}
                valueSuffix={props.suffix}
                onValuesChange={props.onValuesChange}
            />
        </View>
    );
};

NutriSlider.propTypes = {
    max: propTypes.number.isRequired,
    onValuesChange: propTypes.func.isRequired,
    suffix: propTypes.string,
};

export default NutriSlider;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.white,
        paddingVertical: 10,
        alignItems: 'center',
    },
    trackStyle: {
        color: colors.primary,
    },
    markerContainerStyle: {
        color: colors.primary,
    },
});
