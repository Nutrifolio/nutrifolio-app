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

const ProductScreen = (props) => {
    const { id } = props.route.params;
    const { location } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const fetchProduct = useApi(getProduct);

    useEffect(() => {
        if (!product) fetchProduct.request(id);
        setProduct(fetchProduct.data);
    }, [id]);

    const calculateDistance = () => {
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

    return (
        <>
            <ActivityIndicator visible={fetchProduct.loading} />
            <Screen>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.container}
                >
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
                                source={{ uri: fetchProduct.data.image_url }}
                                style={styles.image}
                            />
                        </View>
                        <NutriText style={styles.productName}>
                            {fetchProduct.data.name}
                        </NutriText>
                        <View style={styles.valuesContainer}>
                            <View style={styles.detailValue}>
                                <MaterialCommunityIcons
                                    name='fire'
                                    size={30}
                                    color='black'
                                />
                                <NutriText style={styles.detailValue}>
                                    {fetchProduct.data.calories.toString()}
                                </NutriText>
                            </View>
                            <View style={styles.detailValue}>
                                <MaterialCommunityIcons
                                    name='currency-eur'
                                    size={30}
                                    color='black'
                                />
                                <NutriText style={styles.detailValue}>
                                    {fetchProduct.data.price.toString()}
                                </NutriText>
                            </View>
                            <View style={styles.detailValue}>
                                <MaterialCommunityIcons
                                    name='map-marker'
                                    size={30}
                                    color='black'
                                />
                                <NutriText style={styles.detailValue}>
                                    {calculateDistance}
                                </NutriText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Screen>
        </>
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
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    likeContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    mainInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    imageContainer: {
        width: '35%',
        height: '40%',
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: 5,
        shadowOpacity: '25%',
        shadowRadius: 4,
        marginBottom: 20,
    },
    image: {
        borderRadius: 10,
        resizeMode: 'contain',
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
    },
    detailValue: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
});

export default ProductScreen;
