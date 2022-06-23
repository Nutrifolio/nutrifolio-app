import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import NutriText from '../components/NutriText';
import { NutriForm, NutriFormField, SubmitButton } from '../components/forms';
import * as Yup from 'yup';
import colors from '../styles/colors';
import routes from '../navigation/routes';

import Screen from '../components/Screen';
import TextButton from '../components/buttons/TextButton';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label('First Name'),
    lastName: Yup.string().required().label('Last Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Passwords must match'),
});

const RegisterScreen = (props) => {
    const { navigation } = props;
    const registerMessage = 'Sign up';
    return (
        <Screen>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <NutriText style={styles.title}>{registerMessage}</NutriText>
                <NutriForm
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={validationSchema}
                >
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
                    onPress={() => navigation.navigate(routes.LOGIN)}
                />
            </ScrollView>
        </Screen>
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
