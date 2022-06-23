import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import propTypes from 'prop-types';
import Screen from '../components/Screen';
import NutriText from '../components/NutriText';
import colors from '../styles/colors';
import ProductCard from '../components/ProductCard';
import SmallButton from '../components/buttons/SmallButton';

const data = [
    {
        title: 'Skatomyga',
        description:
            'Long text long text long text long textl ong text long text long txt',
        calories: '140',
        price: '13',
        distance: '150m',
        storeImage: 'https://reactnative.dev/img/tiny_logo.png',
        store: 'To koytoyki toy sari',
        productImage: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
        title: 'Saliosaligkario',
        description:
            'Long text long text long text long textl ong text long text long txt',
        calories: '140',
        price: '13',
        distance: '150m',
        storeImage: 'https://reactnative.dev/img/tiny_logo.png',
        store: 'To koytoyki toy sari',
        productImage: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
        title: 'Gyfterida',
        description:
            'Long text long text long text long textl ong text long text long txt',
        calories: '140',
        price: '13',
        distance: '150m',
        storeImage: 'https://reactnative.dev/img/tiny_logo.png',
        store: 'To koytoyki toy sari',
        productImage: 'https://reactnative.dev/img/tiny_logo.png',
    },
];

const welcomeMessage = 'Welcome back,';
const username = 'John';
const titleList1 = 'FAVORITES';
const smallButtonText = 'View All';

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <NutriText style={styles.welcome}>
                        {welcomeMessage}
                    </NutriText>
                    <NutriText style={styles.username}>{username}</NutriText>
                </View>

                <View style={styles.listTitle}>
                    <NutriText style={styles.listTitle}>{titleList1}</NutriText>
                    <SmallButton
                        text={smallButtonText}
                        onPress={() => console.log('pressed')}
                    />
                </View>

                <FlatList
                    ItemSeparatorComponent={() => (
                        <View style={styles.divider} />
                    )}
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                    data={data}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <ProductCard
                            title={item.title}
                            calories={item.calories}
                            description={item.description}
                            distance={item.distance}
                            price={item.price}
                            productImage={item.productImage}
                            store={item.store}
                            storeImage={item.storeImage}
                        />
                    )}
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
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    titleContainer: {
        paddingBottom: 25,
    },
    welcome: {
        fontSize: 28,
        color: colors.black,
    },
    username: {
        fontSize: 28,
        color: colors.primary,
    },
    listTitle: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        fontSize: 18,
    },
    divider: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 0.2,
    },
});

export default HomeScreen;
