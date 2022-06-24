import * as Yup from 'yup';
import colors from '../styles/colors';
import NutriText from '../components/NutriText';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import TextButton from '../components/buttons/TextButton';
import useAuth from '../hooks/useAuth';
import React, { useState } from 'react';
import { signup } from '../api/accountApi';
import { StyleSheet, ScrollView } from 'react-native';
import { NutriForm, NutriFormField, SubmitButton } from '../components/forms';
import ErrorMessage from '../components/forms/ErrorMessage';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label('First Name'),
    lastName: Yup.string().required().label('Last Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Passwords must match'),
});

const registerMessage = 'Sign up';

const RegisterScreen = (props) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { logIn } = useAuth();

    const handleSubmit = async (userInfo) => {
        const { firstName, lastName, email, password, confirmPassword } =
            userInfo;

        const body = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            conf_password: confirmPassword,
        };
        setLoading(true);
        const response = await signup(body);
        const data = await response.json();

        // Error handling
        if (!response.ok) {
            if (data) {
                setError(data.detail[0]);
            } else {
                setError('An unexpected error occured. Try again later.');
            }
            setLoading(false);
            return;
        }

        // Log in
        setError(null);
        setLoading(false);
        logIn(data.access_token);
    };

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <NutriText style={styles.title}>
                        {registerMessage}
                    </NutriText>
                    <NutriForm
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} />
                        <NutriFormField
                            placeholder='First Name'
                            name='firstName'
                            textContentType='givenName'
                            iconName='account-circle'
                        />

                        <NutriFormField
                            placeholder='Last Name'
                            name='lastName'
                            textContentType='familyName'
                            iconName='account-circle'
                        />

                        <NutriFormField
                            placeholder='Email'
                            name='email'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            iconName='email'
                            autoCapitalize='none'
                        />

                        <NutriFormField
                            placeholder='Password'
                            name='password'
                            autoCapitalize='none'
                            iconName='lock'
                            textContentType='password'
                            secureTextEntry={true}
                        />

                        <NutriFormField
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            autoCapitalize='none'
                            iconName='lock'
                            textContentType='password'
                            secureTextEntry={true}
                        />

                        <SubmitButton text='Create Account' />
                    </NutriForm>
                    <TextButton
                        text='Already have an account?'
                        textStyle={styles.link}
                        onPress={() => props.navigation.navigate(routes.LOGIN)}
                    />
                </ScrollView>
            </Screen>
        </>
    );
};

RegisterScreen.propTypes = {
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    link: {
        marginTop: 50,
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;
