import * as Yup from 'yup';
import colors from '../styles/colors';
import ErrorMessage from '../components/forms/ErrorMessage';
import NutriText from '../components/NutriText';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import TextButton from '../components/buttons/TextButton';
import useAuth from '../hooks/useAuth';
import React, { useEffect } from 'react';
import { login as loginApi } from '../api/accountApi';
import { StyleSheet, View } from 'react-native';
import { NutriForm, NutriFormField, SubmitButton } from '../components/forms';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
    username: Yup.string().required().email().label('Email'),
    password: Yup.string().required().label('Password'),
});

const LoginScreen = (props) => {
    const { data, error, loading, request } = useApi(loginApi);
    const { logIn } = useAuth();

    const handleSubmit = async (credentials) => {
        await request(credentials);
    };

    useEffect(() => {
        if (data) {
            logIn(data.access_token);
        }
    }, [data]);

    const { navigation } = props;
    const welcomeMessage = 'Welcome Back';
    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen>
                <View style={styles.container}>
                    <NutriText style={styles.title}>{welcomeMessage}</NutriText>
                    <NutriForm
                        initialValues={{ username: '', password: '' }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} />
                        <NutriFormField
                            placeholder='Email'
                            name='username'
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
        </>
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
