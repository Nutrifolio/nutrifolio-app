import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import Screen from '../components/Screen';

const HomeScreen = (props) => {
    return (
        <Screen>
            <View style={styles.container}>
                <Text>HomeScreen</Text>
                <Button
                    title="Go to product"
                    onPress={() => props.navigation.navigate('Product')}
                />
                <Button
                    title="Go to store"
                    onPress={() => props.navigation.navigate('Store')}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default HomeScreen;