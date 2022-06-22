import React from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import { useFormikContext } from 'formik';
import propTypes from 'prop-types';

const SubmitButton = (props) => {
    const { handleSubmit } = useFormikContext();
    return <PrimaryButton text={props.text} onPress={handleSubmit} />;
};

SubmitButton.propTypes = {
    text: propTypes.string,
};

export default SubmitButton;
