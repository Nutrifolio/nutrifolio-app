import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import FillableIconButton from '../components/buttons/FillableIconButton';
import Screen from '../components/Screen';
import colors from '../styles/colors';
import useApi from '../hooks/useApi';
import { getProduct } from '../api/productApi';
import propTypes from 'prop-types';
import NutriText from '../components/NutriText';
import haversine from 'haversine-distance';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActivityIndicator from '../components/ActivityIndicator';
import UserContext from '../auth/userContext';
import PrimaryButton from '../components/buttons/PrimaryButton';

const descriptionTitle = 'Description';
const detailSectionTitle = 'Nutritional Value';
const calTitle = 'Calories';
const locTitle = 'Location';

const ProductScreen = (props) => {
    const { id } = props.route.params;
    const { location } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const fetchProduct = useApi(getProduct);

    useEffect(() => {
        fetchProduct.request(id);
    }, []);

    useEffect(() => {
        setProduct(fetchProduct.data);
        return () => setProduct(null);
    }, [fetchProduct.data]);

    const printDistance = () => {
        const productLocation = {
            latitude: fetchProduct.data.store.lat,
            longitude: fetchProduct.data.store.lng,
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

    if (!product) {
        return <ActivityIndicator />;
    }
    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.likeContainer}>
                    <FillableIconButton
                        icon='heart-outline'
                        iconFilled='heart'
                        text=''
                        onPress={() => {}}
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
                        <PrimaryButton onPress={() => {}} text={'Reserve'} />
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
                    <View style={styles.storeInfo}>
                        <Image
                            source={{ uri: product.store.logo_url }}
                            style={styles.storeImage}
                        />
                        <NutriText style={styles.storeName}>
                            {product.store.name}
                        </NutriText>
                    </View>
                    <View>
                        <NutriText style={styles.locationTitle}>
                            {locTitle}
                        </NutriText>
                        <NutriText>{product.store.location}</NutriText>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
};

ProductScreen.propTypes = {
    id: propTypes.number,
    location: propTypes.objectOf(propTypes.number),
    route: propTypes.object,
    params: propTypes.object,
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingVertical: 10,
    },
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
        alignItems: 'center',
        paddingBottom: 20,
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
    locationTitle: {
        fontSize: 15,
        paddingBottom: 5,
    },
});

export default ProductScreen;
