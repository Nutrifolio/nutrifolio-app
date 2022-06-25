import * as Yup from 'yup';
import ActivityIndicator from '../components/ActivityIndicator';
import colors from '../styles/colors';
import ErrorMessage from '../components/forms/ErrorMessage';
import NutriText from '../components/NutriText';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import TextButton from '../components/buttons/TextButton';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import React, { useEffect } from 'react';
import { signup } from '../api/accountApi';
import { StyleSheet, ScrollView } from 'react-native';
import { NutriForm, NutriFormField, SubmitButton } from '../components/forms';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required().label('First Name'),
    last_name: Yup.string().required().label('Last Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(12).label('Password'),
    conf_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Passwords must match'),
});

const registerMessage = 'Sign up';

const RegisterScreen = (props) => {
    const { data, loading, error, request } = useApi(signup);
    const { logIn } = useAuth();

    const handleSubmit = async (userInfo) => {
        await request(userInfo);
    };

    useEffect(() => {
        if (data) logIn(data.access_token);
    }, [data]);

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
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                            conf_password: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} />
                        <NutriFormField
                            placeholder='First Name'
                            name='first_name'
                            textContentType='givenName'
                            iconName='account-circle'
                        />

                        <NutriFormField
                            placeholder='Last Name'
                            name='last_name'
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
                            name='conf_password'
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
