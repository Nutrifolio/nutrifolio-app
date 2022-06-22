import React from 'react';
import { StyleSheet, View } from 'react-native';
import NutriText from '../components/NutriText';
import Screen from '../components/Screen';
import colors from '../styles/colors';
import { NutriForm, NutriFormField, SubmitButton } from '../components/forms';
import NutriLink from '../components/NutriLink';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().label('Password'),
});

const LoginScreen = () => {
    const welcomeMessage = 'Welcome Back';
    return (
        <Screen>
            <View style={styles.container}>
                <NutriText style={styles.title}>{welcomeMessage}</NutriText>
                <NutriForm
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={validationSchema}
                >
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
                <NutriLink text='Not a member yet?' style={styles.link} />
            </View>
        </Screen>
    );
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
        marginBottom: 20,
    },
    link: {
        marginTop: 20,
    },
});

export default LoginScreen;
