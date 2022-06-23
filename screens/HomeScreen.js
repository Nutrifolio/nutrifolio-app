import colors from '../styles/colors';
import NutriText from '../components/NutriText';
import ProductCard from '../components/ProductCard';
import propTypes from 'prop-types';
import React from 'react';
import Screen from '../components/Screen';
import SmallButton from '../components/buttons/SmallButton';
import { StyleSheet, View, ScrollView } from 'react-native';

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
const titleList2 = 'RECENTS';
const smallButtonText = 'View All';

const HomeScreen = () => {
    return (
        <Screen>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View>
                    <NutriText style={styles.welcome}>
                        {welcomeMessage}
                    </NutriText>
                    <NutriText style={styles.username}>{username}</NutriText>
                </View>

                <View style={styles.listHeader}>
                    <NutriText style={styles.listTitle}>{titleList1}</NutriText>
                    <SmallButton
                        text={smallButtonText}
                        onPress={() => console.log('pressed')}
                    />
                </View>

                {data.slice(0, 2).map((item) => (
                    <ProductCard
                        key={data.indexOf(item)}
                        title={item.title}
                        calories={item.calories}
                        description={item.description}
                        distance={item.distance}
                        price={item.price}
                        productImage={item.productImage}
                        store={item.store}
                        storeImage={item.storeImage}
                    />
                ))}

                <View style={styles.listHeader}>
                    <NutriText style={styles.listTitle}>{titleList2}</NutriText>
                    <SmallButton
                        text={smallButtonText}
                        onPress={() => console.log('pressed')}
                    />
                </View>

                {data.slice(0, 2).map((item) => (
                    <ProductCard
                        key={data.indexOf(item)}
                        title={item.title}
                        calories={item.calories}
                        description={item.description}
                        distance={item.distance}
                        price={item.price}
                        productImage={item.productImage}
                        store={item.store}
                        storeImage={item.storeImage}
                    />
                ))}
            </ScrollView>
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
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    welcome: {
        fontSize: 28,
        color: colors.black,
    },
    username: {
        fontSize: 28,
        color: colors.primary,
    },
    listHeader: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 25,
    },
    listTitle: {
        fontSize: 18,
    },
});

export default HomeScreen;
