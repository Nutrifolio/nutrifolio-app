import ActivityIndicator from '../components/ActivityIndicator';
import colors from '../styles/colors';
import haversine from 'haversine-distance';
import NutriText from '../components/NutriText';
import ProductCard from '../components/lists/ProductCard';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import SmallButton from '../components/buttons/SmallButton';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import UserContext from '../auth/userContext';
import React, { useEffect, useContext, useState } from 'react';
import { getUser } from '../api/accountApi';
import { getFavorites, getRecents } from '../api/productApi';
import { StyleSheet, View, ScrollView } from 'react-native';

const welcomeMessage = 'Welcome';
const titleList1 = 'FAVORITES';
const titleList2 = 'RECENTS';
const initialLimit = 2;
const noFavorites = 'No favorites yet';
const noRecents = 'No recents yet';

const HomeScreen = (props) => {
    const { location, products, setProducts, userInfo, setUserInfo } =
        useContext(UserContext);
    const [recentsCount, setRecentsCount] = useState(initialLimit);
    const [favoritesCount, setFavoritesCount] = useState(initialLimit);
    const [recentsAll, setRecentsAll] = useState('View all');
    const [favoritesAll, setFavoritesAll] = useState('View all');
    const { accessToken } = useAuth();
    const recentsApi = useApi(getRecents);
    const favoritesApi = useApi(getFavorites);
    const userInfoApi = useApi(getUser);

    useEffect(() => {
        recentsApi.request(accessToken);
        favoritesApi.request(accessToken);
        userInfoApi.request(accessToken);
    }, []);

    useEffect(() => {
        if (recentsApi.data) {
            setProducts({ ...products, recents: recentsApi.data.recents });
        }
    }, [recentsApi.data, recentsApi.loading]);

    useEffect(() => {
        if (favoritesApi.data && favoritesApi.data.favorites) {
            setProducts({
                ...products,
                favorites: favoritesApi.data.favorites,
            });
        }
    }, [favoritesApi.data, favoritesApi.loading]);

    useEffect(() => {
        if (userInfoApi.data) {
            setUserInfo(userInfoApi.data);
        }
    }, [userInfoApi.data, userInfoApi.loading]);

    const calculateDistance = ({ lat, lng }) => {
        const productLocation = {
            latitude: lat,
            longitude: lng,
        };
        return haversine(productLocation, location) / 1000;
    };

    const handleAllFavorites = () => {
        if (favoritesAll === 'View all') {
            setFavoritesAll('Hide');
            if (products && products.favorites && products.favorites.length)
                setFavoritesCount(products.favorites.length);
        } else {
            setFavoritesAll('View all');
            setFavoritesCount(2);
        }
    };

    const handleAllRecents = () => {
        if (recentsAll === 'View all') {
            setRecentsAll('Hide');
            if (products && products.recents && products.recents.length)
                setRecentsCount(products.recents.length);
        } else {
            setRecentsAll('View all');
            setRecentsCount(2);
        }
    };

    return (
        <>
            <Screen>
                <ActivityIndicator
                    visible={
                        recentsApi.loading || favoritesApi.loading || !userInfo
                    }
                    text={'Loading your data...'}
                />
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View>
                        <NutriText style={styles.welcome}>
                            {welcomeMessage}
                        </NutriText>
                        {userInfo && (
                            <NutriText style={styles.username}>
                                {userInfo.first_name}
                            </NutriText>
                        )}
                    </View>

                    <View style={styles.listHeader}>
                        <NutriText style={styles.listTitle}>
                            {titleList1}
                        </NutriText>
                        <SmallButton
                            text={favoritesAll}
                            onPress={handleAllFavorites}
                        />
                    </View>

                    {products &&
                    products.favorites &&
                    products.favorites.length ? (
                        products.favorites
                            .slice(0, favoritesCount)
                            .map((item) => (
                                <ProductCard
                                    title={item.name}
                                    key={'fav_'.concat(item.id)}
                                    calories={item.calories}
                                    description={item.description}
                                    distance={calculateDistance({
                                        lat: item.store.lat,
                                        lng: item.store.lng,
                                    })}
                                    price={item.price}
                                    productImage={item.image_url}
                                    store={item.store.name}
                                    storeImage={item.store.logo_url}
                                    onPress={() =>
                                        props.navigation.navigate(
                                            routes.PRODUCT,
                                            {
                                                id: item.id,
                                            },
                                        )
                                    }
                                />
                            ))
                    ) : (
                        <NutriText>{noFavorites}</NutriText>
                    )}

                    <View style={styles.listHeader}>
                        <NutriText style={styles.listTitle}>
                            {titleList2}
                        </NutriText>
                        <SmallButton
                            text={recentsAll}
                            onPress={handleAllRecents}
                        />
                    </View>

                    {products && products.recents && products.recents.length ? (
                        products.recents.slice(0, recentsCount).map((item) => (
                            <ProductCard
                                title={item.name}
                                key={'rec_'.concat(item.id)}
                                calories={item.calories}
                                description={item.description}
                                distance={calculateDistance({
                                    lat: item.store.lat,
                                    lng: item.store.lng,
                                })}
                                price={item.price}
                                productImage={item.image_url}
                                store={item.store.name}
                                storeImage={item.store.logo_url}
                                onPress={() =>
                                    props.navigation.navigate(routes.PRODUCT, {
                                        id: item.id,
                                    })
                                }
                            />
                        ))
                    ) : (
                        <NutriText>{noRecents}</NutriText>
                    )}
                </ScrollView>
            </Screen>
        </>
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
