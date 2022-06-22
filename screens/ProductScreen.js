import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Screen from '../components/Screen';

const ProductScreen = () => {
    return (
        <Screen>
            <View style={styles.container}>
                <Text>ProductScreen</Text>
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
    },
});

export default ProductScreen;
