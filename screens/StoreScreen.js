import ActivityIndicator from '../components/ActivityIndicator';
import colors from '../styles/colors';
import NutriText from '../components/NutriText';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import useApi from '../hooks/useApi';
import Screen from '../components/Screen';
import SimpleProductCard from '../components/lists/SimpleProductCard';
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect } from 'react';
import { getStore } from '../api/storeApi';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

const locTitle = 'Location';

const StoreScreen = (props) => {
    const { id } = props.route.params;
    const { data: store, request: fetchStore } = useApi(getStore);

    useEffect(() => {
        fetchStore(id);
    }, [id, fetchStore]);

    if (!store) {
        return <ActivityIndicator visible={true} />;
    }

    const productsList = store.products.map((item) => (
        <View key={item.category}>
            <NutriText style={styles.productsListTitle}>
                {item.category}
            </NutriText>
            <View>
                {item.products.map((product) => (
                    <SimpleProductCard
                        title={product.name}
                        key={'prod_'.concat(product.id)}
                        calories={product.calories}
                        description={product.description}
                        price={product.price}
                        productImage={product.image_url}
                        onPress={() =>
                            props.navigation.navigate(routes.PRODUCT, {
                                id: product.id,
                            })
                        }
                    />
                ))}
            </View>
        </View>
    ));

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.mainInfo}>
                    <View style={styles.storeInfo}>
                        <Image
                            source={{ uri: store.logo_url }}
                            style={styles.storeImage}
                        />
                        <NutriText style={styles.storeName}>
                            {store.name}
                        </NutriText>
                    </View>
                    <View>
                        <NutriText style={styles.locationTitle}>
                            {locTitle}
                        </NutriText>
                        <NutriText>{store.location}</NutriText>
                        <MapView
                            initialRegion={{
                                latitude: store.lat,
                                longitude: store.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}
                        >
                            <Marker
                                coordinate={{
                                    latitude: store.lat,
                                    longitude: store.lng,
                                }}
                            />
                        </MapView>
                    </View>
                </View>

                <View style={styles.productSection}>{productsList}</View>
            </ScrollView>
        </Screen>
    );
};

StoreScreen.propTypes = {
    id: propTypes.number.isRequired,
    route: propTypes.object,
    params: propTypes.object,
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    mainInfo: {
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
    map: {
        width: '100%',
        height: 300,
        marginVertical: 10,
    },
    productSection: {
        borderTopWidth: 0.2,
        borderTopColor: colors.grey,
        padding: 20,
    },
    productsListTitle: {
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 30,
    },
});

export default StoreScreen;
