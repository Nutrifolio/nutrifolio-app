import React from 'react';
import { StyleSheet, View } from 'react-native';
import NutriTextInput from '../NutriTextInput';
import { useFormikContext } from 'formik';
import ErrorMessage from './ErrorMessage';
import propTypes from 'prop-types';
import colors from '../../styles/colors';

const NutriFormField = (props) => {
    const { iconName, placeholder, name, ...otherProps } = props;
    const { setFieldTouched, handleChange, errors, touched } =
        useFormikContext();
    let errorText;
    if (touched[name]) errorText = errors[name];
    else errorText = null;
    return (
        <View style={styles.container}>
            <NutriTextInput
                iconName={iconName}
                placeholder={placeholder}
                style={styles.form}
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                {...otherProps}
            />
            <ErrorMessage error={errorText} />
        </View>
    );
};

NutriFormField.propTypes = {
    iconName: propTypes.string,
    placeholder: propTypes.string,
    name: propTypes.string,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
    },
    form: {
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
        color: colors.black,
        fontSize: 16,
    },
});

export default NutriFormField;
