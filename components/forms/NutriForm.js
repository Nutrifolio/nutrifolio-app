import React from 'react';
import { Formik } from 'formik';
import propTypes from 'prop-types';

const NutriForm = (props) => {
    const { initialValues, onSubmit, validationSchema, children } = props;
    return (
        <Formik
            initialValues={{ initialValues }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => <>{children}</>}
        </Formik>
    );
};

NutriForm.propTypes = {
    initialValues: propTypes.object.isRequired,
    onSubmit: propTypes.func.isRequired,
    validationSchema: propTypes.object.isRequired,
    children: propTypes.node.isRequired,
};

export default NutriForm;
