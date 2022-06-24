import colors from '../styles/colors';
import NutriText from '../components/NutriText';
import ProductCard from '../components/ProductCard';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import SmallButton from '../components/buttons/SmallButton';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import UserContext from '../auth/userContext';
import React, { useEffect, useContext } from 'react';
import { getFavorites, getRecents } from '../api/productApi';
import { StyleSheet, View, ScrollView } from 'react-native';

const welcomeMessage = 'Welcome back,';
const username = 'John';
const titleList1 = 'FAVORITES';
const titleList2 = 'RECENTS';
const smallButtonText = 'View All';

const HomeScreen = ({ navigation }) => {
    const { products, setProducts } = useContext(UserContext);
    const { accessToken } = useAuth();
    const recentsApi = useApi(getRecents);
    const favoritesApi = useApi(getFavorites);

    useEffect(() => {
        if (!products) {
            recentsApi
                .request(accessToken)
                .then((results) => setProducts({ ...products, ...results }));
            favoritesApi
                .request(accessToken)
                .then((results) => setProducts({ ...products, ...results }));
        }
    }, [products]);

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

                {products &&
                    'favorites' in products &&
                    products.favorites.slice(0, 2).map((item) => (
                        <ProductCard
                            key={item.id}
                            title={item.title}
                            calories={item.calories}
                            description={item.description}
                            distance={item.distance}
                            price={item.price}
                            productImage={item.productImage}
                            store={item.store}
                            storeImage={item.storeImage}
                            onPress={() =>
                                navigation.navigate(routes.PRODUCT, {
                                    id: item.id,
                                })
                            }
                        />
                    ))}

                <View style={styles.listHeader}>
                    <NutriText style={styles.listTitle}>{titleList2}</NutriText>
                    <SmallButton
                        text={smallButtonText}
                        onPress={() => console.log('pressed')}
                    />
                </View>

                {products &&
                    'recents' in products &&
                    products.recents.slice(0, 2).map((item) => (
                        <ProductCard
                            key={item.id}
                            title={item.title}
                            calories={item.calories}
                            description={item.description}
                            distance={item.distance}
                            price={item.price}
                            productImage={item.productImage}
                            store={item.store}
                            storeImage={item.storeImage}
                            onPress={() =>
                                navigation.navigate(routes.PRODUCT, {
                                    id: item.id,
                                })
                            }
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
