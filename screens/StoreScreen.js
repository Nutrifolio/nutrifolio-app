import MapView, { Marker } from 'react-native-maps';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import colors from '../styles/colors';
import useApi from '../hooks/useApi';
import { getStore } from '../api/storeApi';
import NutriText from '../components/NutriText';
import ActivityIndicator from '../components/ActivityIndicator';
import UserContext from '../auth/userContext';
import propTypes from 'prop-types';

const locTitle = 'Location';

const StoreScreen = (props) => {
    const { id } = props.route.params;
    const { location } = useContext(UserContext);
    const [store, setStore] = useState(null);
    const fetchStore = useApi(getStore);

    useEffect(() => {
        fetchStore.request(id);
    }, []);

    useEffect(() => {
        setStore(fetchStore.data);
        return () => setStore(null);
    }, [fetchStore.data]);

    if (!store) {
        return <ActivityIndicator />;
    }

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
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                            />
                        </MapView>
                    </View>
                </View>
                {/* <View>
                    <View style={styles.productSection}>
                        <NutriText style={styles.productsTitle}>
                            {productsTitle}
                        </NutriText>
                    </View>
                    <SectionList
                        sections={store.products}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => (
                            <ProductCard
                                title={item.name}
                                key={'fav_'.concat(item.id)}
                                calories={item.calories}
                                description={item.description}
                                distance={calculateDistance({
                                    lat: store.lat,
                                    lng: store.lng,
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
                        )}
                        renderSectionHeader={({ section: { category } }) => (
                            <NutriText style={styles.productsTitle}>
                                {category}
                            </NutriText>
                        )}
                    />
                </View> */}
            </ScrollView>
        </Screen>
    );
};

StoreScreen.propTypes = {
    id: propTypes.number.isRequired,
    route: propTypes.object,
    params: propTypes.object,
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
    productsTitle: {
        fontSize: 20,
    },
});

export default StoreScreen;
