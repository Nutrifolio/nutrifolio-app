import colors from '../../styles/colors';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import NutriText from '../NutriText';
import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const NutriSlider = (props) => {
    const customLabels = ({ oneMarkerValue, twoMarkerValue }, measureUnits) => (
        <View style={styles.labelWrapper}>
            <NutriText>
                {oneMarkerValue.toString().concat(measureUnits)}
            </NutriText>

            {twoMarkerValue ? (
                <NutriText>
                    {twoMarkerValue.toString().concat(measureUnits)}
                </NutriText>
            ) : null}
        </View>
    );

    return (
        <View style={styles.container}>
            <MultiSlider
                trackStyle={styles.trackStyle}
                selectedStyle={styles.selectedStyle}
                markerStyle={styles.markerStyle}
                pressedMarkerStyle={styles.pressedMarkerStyle}
                enableLabel={true}
                customLabel={(labelProps) =>
                    customLabels(labelProps, props.suffix)
                }
                min={0}
                max={props.max}
                valueSuffix={props.suffix}
                onValuesChange={props.onValuesChange}
                values={props.value}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
            />
        </View>
    );
};

NutriSlider.propTypes = {
    max: propTypes.number.isRequired,
    onValuesChange: propTypes.func.isRequired,
    value: propTypes.arrayOf(propTypes.number),
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
        backgroundColor: colors.lightGrey,
    },
    selectedStyle: {
        backgroundColor: colors.primary,
    },
    markerStyle: {
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: colors.white,
        height: 20,
        width: 20,
    },
    pressedMarkerStyle: {
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: colors.primary,
        height: 25,
        width: 25,
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
