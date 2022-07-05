import ActivityIndicator from '../components/ActivityIndicator';
import AuthContext from '../auth/authContext';
import colors from '../styles/colors';
import FillableIconButton from '../components/buttons/FillableIconButton';
import haversine from 'haversine-distance';
import LottieView from 'lottie-react-native';
import NutriButtonIcon from '../components/buttons/NutriButtonIcon';
import NutriText from '../components/NutriText';
import PrimaryButton from '../components/buttons/PrimaryButton';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import UserContext from '../auth/userContext';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import {
    getProduct,
    createRecent,
    createFavorite,
    deleteFavorite,
} from '../api/productApi';

const descriptionTitle = 'Description';
const detailSectionTitle = 'Nutritional Value';
const calTitle = 'Calories';
const locTitle = 'Location';

const ProductScreen = (props) => {
    const { id } = props.route.params;
    const { accessToken } = useContext(AuthContext);
    const {
        location,
        products: contextProducts,
        setProducts: setContextProducts,
    } = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showDone, setShowDone] = useState(false);
    const { data: product, request: fetchProduct } = useApi(getProduct);
    const createFavoriteApi = useApi(createFavorite);
    const deleteFavoriteApi = useApi(deleteFavorite);
    const recentApi = useApi(createRecent);

    // Start
    useEffect(() => {
        fetchProduct(id);
    }, [id, fetchProduct]);

    // Product info is fetched
    useEffect(() => {
        if (product) {
            // Check if product is favorite
            if (contextProducts && contextProducts.favorites) {
                if (
                    contextProducts.favorites.find(
                        (favProduct) => favProduct.id === product.id,
                    )
                ) {
                    setIsFavorite(true);
                } else setIsFavorite(false);
            }
        }
        // Cleanup
        return () => {
            setIsFavorite(false);
        };
    }, [product, contextProducts]);

    const printDistance = () => {
        const productLocation = {
            latitude: product.store.lat,
            longitude: product.store.lng,
        };
        let loc = haversine(location, productLocation);
        if (loc >= 1000) {
            return (loc / 1000).toFixed(2).toString().concat('km');
        } else {
            return Math.round(loc).toString().concat('m');
        }
    };

    const printWeight = () => {
        const wt = product.details.weight;
        if (wt > 1000) {
            return (wt / 1000).toString().concat('kg');
        } else {
            return wt.toString().concat('g');
        }
    };

    const handlePressFavorite = () => {
        if (!isFavorite) {
            // Like
            setIsFavorite(true);
            createFavoriteApi.request({ product_id: product.id }, accessToken);
            setContextProducts({
                recents: contextProducts.recents,
                favorites: [...contextProducts.favorites, product],
            });
        } else {
            // Unlike
            setIsFavorite(false);
            deleteFavoriteApi.request(product.id, accessToken);
            setContextProducts({
                recents: contextProducts.recents,
                favorites: contextProducts.favorites.filter(
                    (favProduct) => favProduct.id !== product.id,
                ),
            });
        }
    };

    const handlePressRecent = () => {
        if (
            !contextProducts.recents.find(
                (recentProd) => recentProd.id === product.id,
            )
        ) {
            recentApi.request({ product_id: product.id }, accessToken);
            setContextProducts({
                recents: [...contextProducts.recents, product],
                favorites: contextProducts.favorites,
            });
            setShowDone(true);
        }
    };

    if (!product) {
        return <ActivityIndicator visible={true} text={'Loading...'} />;
    }
    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.likeContainer}>
                    <FillableIconButton
                        icon='heart-outline'
                        iconFilled='heart'
                        text=''
                        pressed={isFavorite}
                        onPress={handlePressFavorite}
                    />
                </View>

                <View style={styles.mainInfo}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: product.image_url }}
                            style={styles.image}
                        />
                    </View>

                    <NutriText style={styles.productName}>
                        {product.name}
                    </NutriText>

                    <View style={styles.valuesContainer}>
                        <View style={styles.detailValue}>
                            <MaterialCommunityIcons
                                name='fire'
                                size={30}
                                color='black'
                            />
                            <NutriText style={styles.detailValue}>
                                {product.calories.toString().concat(' kcal')}
                            </NutriText>
                        </View>
                        <View style={styles.detailValue}>
                            <MaterialCommunityIcons
                                name='currency-eur'
                                size={30}
                                color='black'
                            />
                            <NutriText style={styles.detailValue}>
                                {product.price.toString()}
                            </NutriText>
                        </View>
                        <View style={styles.detailValue}>
                            <MaterialCommunityIcons
                                name='map-marker'
                                size={30}
                                color='black'
                            />
                            <NutriText style={styles.detailValue}>
                                {printDistance()}
                            </NutriText>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {showDone ? (
                            <LottieView
                                autoPlay
                                loop={false}
                                onAnimationFinish={() => setShowDone(false)}
                                source={require('../assets/animations/done.json')}
                                style={styles.animation}
                                speed={2}
                            />
                        ) : (
                            <PrimaryButton
                                onPress={handlePressRecent}
                                text={'Add to Recents'}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.section}>
                    <NutriText style={styles.sectionTitle}>
                        {descriptionTitle}
                    </NutriText>
                    <NutriText style={styles.description}>
                        {product.description}
                    </NutriText>
                    <NutriText>{printWeight()}</NutriText>
                </View>
                <View style={styles.section}>
                    <NutriText style={styles.sectionTitle}>
                        {detailSectionTitle}
                    </NutriText>
                    <View style={styles.detailsPair}>
                        <NutriText>{calTitle}</NutriText>
                        <NutriText>
                            {product.calories.toString().concat(' kcal')}
                        </NutriText>
                    </View>

                    {Object.entries(product.details).map(([key, value]) => {
                        if (key === 'weight') return;
                        return (
                            <View key={key} style={styles.detailsPair}>
                                <NutriText>
                                    {key.charAt(0).toUpperCase() +
                                        key.slice(1).replace('_', ' ')}
                                </NutriText>
                                <NutriText>
                                    {value.toFixed(1).toString().concat(' g')}
                                </NutriText>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.storeContainer}>
                    <View>
                        <View style={styles.storeInfo}>
                            <View style={styles.logoTitle}>
                                <Image
                                    source={{ uri: product.store.logo_url }}
                                    style={styles.storeImage}
                                />
                                <NutriText style={styles.storeName}>
                                    {product.store.name}
                                </NutriText>
                            </View>
                            <NutriButtonIcon // TODO fix center
                                text=''
                                icon='chevron-right'
                                onPress={() =>
                                    props.navigation.navigate(routes.STORE, {
                                        id: product.store.id,
                                    })
                                }
                                style={styles.chevronStyle}
                                containerStyle={styles.chevronContainer}
                            />
                        </View>
                    </View>
                    <View>
                        <NutriText style={styles.locationTitle}>
                            {locTitle}
                        </NutriText>
                        <NutriText>{product.store.location}</NutriText>
                        <MapView
                            initialRegion={{
                                latitude: product.store.lat,
                                longitude: product.store.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}
                        >
                            <Marker
                                coordinate={{
                                    latitude: product.store.lat,
                                    longitude: product.store.lng,
                                }}
                            />
                        </MapView>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
};

ProductScreen.propTypes = {
    id: propTypes.number,
    route: propTypes.object,
    params: propTypes.object,
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    likeContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    mainInfo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 0.2,
        borderBottomColor: colors.grey,
        height: 300, // TODO Make height flex, once scrollview is fixed
    },
    imageContainer: {
        width: '45%',
        height: '30%',
        borderRadius: 10,
        backgroundColor: 'transparent',
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: 5,
        shadowOpacity: '25%',
        shadowRadius: 4,
        marginBottom: 20,
    },
    image: {
        resizeMode: 'contain',
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    productName: {
        fontSize: 20,
        marginBottom: 10,
    },
    valuesContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 30,
    },

    detailValue: {
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 60,
    },
    section: {
        width: '100%',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 0.2,
        borderBottomColor: colors.grey,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 18,
        paddingBottom: 5,
    },
    description: {
        paddingBottom: 5,
    },
    detailsPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    storeContainer: {
        padding: 20,
    },
    storeInfo: {
        flexDirection: 'row',
        paddingBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    storeImage: {
        borderRadius: 100,
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    storeName: {
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 10,
    },
    logoTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationTitle: {
        fontSize: 15,
        paddingBottom: 5,
    },
    map: {
        width: '100%',
        height: 300,
        marginVertical: 10,
    },
    chevronStyle: {
        fontSize: 30,
        color: colors.black,
    },
    chevronContainer: {
        paddingLeft: 20,
    },
});

export default ProductScreen;
