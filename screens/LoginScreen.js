import * as Yup from 'yup';
import colors from '../styles/colors';
import ErrorMessage from '../components/forms/ErrorMessage';
import NutriText from '../components/NutriText';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import TextButton from '../components/buttons/TextButton';
import useAuth from '../hooks/useAuth';
import React, { useState } from 'react';
import { login } from '../api/accountApi';
import { StyleSheet, View } from 'react-native';
import { NutriForm, NutriFormField, SubmitButton } from '../components/forms';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().label('Password'),
});

const LoginScreen = (props) => {
    const { logIn } = useAuth();
    const [error, setError] = useState();

    const handleSubmit = async (values) => {
        const body = { username: values.email, password: values.password };
        const response = await login(body);
        const data = await response.json();

        if (!response.ok) {
            if (data) {
                setError(data.detail);
            } else {
                setError('An unexpected error occured. Try again later.');
            }
            await new Promise((resolve) =>
                setTimeout(() => {
                    setError(null);
                    return resolve;
                }, 6000),
            );
            return;
        }

        setError(null);
        logIn(data.access_token);
    };

    const { navigation } = props;
    const welcomeMessage = 'Welcome Back';
    return (
        <Screen>
            <View style={styles.container}>
                <NutriText style={styles.title}>{welcomeMessage}</NutriText>
                <NutriForm
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error={error} />
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

                    <SubmitButton text='Log in' />
                </NutriForm>
                <TextButton
                    text='Not a member yet?'
                    textStyle={styles.link}
                    onPress={() => navigation.navigate(routes.REGISTER)}
                />
            </View>
        </Screen>
    );
};

LoginScreen.propTypes = {
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
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

export default LoginScreen;
