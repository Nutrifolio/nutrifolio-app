import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import propTypes from 'prop-types';
import Screen from '../components/Screen';
import PrimaryButton from '../components/buttons/PrimaryButton';

const HomeScreen = (props) => {
    return (
        <Screen>
            <View style={styles.container}>
                <Text>HomeScreen</Text>
                <Button
                    title='Go to product'
                    onPress={() => props.navigation.navigate('ProductScreen')}
                />
                <Button
                    title='Go to store'
                    onPress={() => props.navigation.navigate('StoreScreen')}
                />
                <PrimaryButton
                    text='Press me'
                    onPress={() => props.navigation.navigate('StoreScreen')}
                />
            </View>
        </Screen>
    );
};

HomeScreen.propTypes = {
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
