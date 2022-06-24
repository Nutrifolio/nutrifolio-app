import ActivityIndicator from '../components/ActivityIndicator';
import colors from '../styles/colors';
import FillableIconButton from '../components/buttons/FillableIconButton';
import FilterModal from '../components/filters/FilterModal';
import NutriTextInput from '../components/NutriTextInput';
import ProductCard from '../components/ProductCard';
import propTypes from 'prop-types';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import StoreCard from '../components/StoreCard';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import useLocation from '../hooks/useLocation';
import React, { useState } from 'react';
import { searchStore } from '../api/storeApi';
import { filterProducts, getFavorites, getRecents } from '../api/productApi';
import { StyleSheet, Image, View, FlatList } from 'react-native';

const SearchScreen = ({ navigation }) => {
    const filterApi = useApi(filterProducts);
    const favoritesApi = useApi(getFavorites);
    const recentsApi = useApi(getRecents);
    const storeApi = useApi(searchStore);
    const { location, loading: locationLoading } = useLocation();
    const { accessToken } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [pressed, setPressed] = useState('none');

    // XXX Not allowing inline styles leads to this mess
    let opacityStyle = { opacity: 1 };
    modalVisible ? (opacityStyle.opacity = 0.3) : (opacityStyle.opacity = 1);

    const handleToggleFilter = () => {
        if (pressed !== 'filter') {
            setPressed('filter');
            setModalVisible(!modalVisible);
        } else {
            setPressed('none');
        }
    };

    const handleSubmitFilter = (body) => {
        const { latitude, longitude } = location;
        body.lat = latitude;
        body.lng = longitude;
        filterApi.request(body).then(setProducts(filterApi.data.products));
        setModalVisible(false);
        setPressed('none');
        setStores([]);
    };

    const handleToggleLiked = () => {
        if (pressed !== 'liked') {
            setPressed('liked');
            favoritesApi
                .request(accessToken)
                .then(setProducts(favoritesApi.data.favorites));
            setStores([]);
        } else {
            setPressed('none');
        }
    };

    const handleToggleRecent = () => {
        if (pressed !== 'recent') {
            setPressed('recent');
            recentsApi
                .request(accessToken)
                .then(setProducts(favoritesApi.data.recents));
            setStores([]);
        } else {
            setPressed('none');
        }
    };

    const handleSearch = () => {
        storeApi
            .request(searchText, location.latitude, location.longitude, 200)
            .then(setStores(storeApi.data.stores));
        setProducts([]);
    };

    // To anyone who reads this mess, I apologize
    return (
        <>
            <ActivityIndicator
                visible={
                    storeApi.loading ||
                    recentsApi.loading ||
                    favoritesApi.loading ||
                    filterApi.loading ||
                    locationLoading
                }
            />
            <Screen>
                <View
                    style={{
                        ...styles.container,
                        ...opacityStyle,
                    }}
                >
                    <View style={styles.searchOptions}>
                        <NutriTextInput
                            iconName='magnify'
                            placeholder='Search Nearby Stores'
                            style={styles.searchBar}
                            onSubmitEditing={handleSearch}
                            defaultValue={searchText}
                            onChangeText={(newText) => setSearchText(newText)}
                        />
                        <View style={styles.buttonContainer}>
                            <FillableIconButton
                                text='Filter'
                                icon='filter-outline'
                                iconFilled='filter'
                                pressed={pressed === 'filter'}
                                onPress={handleToggleFilter}
                            />
                            <FillableIconButton
                                text='Liked'
                                icon='heart-outline'
                                iconFilled='heart'
                                pressed={pressed === 'liked'}
                                onPress={handleToggleLiked}
                            />
                            <FillableIconButton
                                text='Recent'
                                icon='clock-outline'
                                iconFilled='clock'
                                pressed={pressed === 'recent'}
                                onPress={handleToggleRecent}
                            />
                        </View>
                    </View>

                    <FilterModal
                        toggleModal={() => handleToggleFilter()}
                        visible={modalVisible}
                        onSubmit={handleSubmitFilter}
                    />

                    {!(products && products.length > 0) &&
                        !(stores && stores.length) && (
                            <Image
                                source={require('../assets/no_results.png')}
                                style={styles.image}
                            />
                        )}

                    {
                        /* STORES */
                        stores && stores.length > 0 && (
                            <FlatList
                                ItemSeparatorComponent={() => (
                                    <View style={styles.divider} />
                                )}
                                refreshing={locationLoading}
                                onRefresh={() => handleSearch()}
                                data={stores}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <StoreCard
                                        key={item.id}
                                        name={item.name}
                                        distance={item.distance}
                                        location={item.location}
                                        logo_url={item.logo_url}
                                        onPress={() =>
                                            navigation.navigate(routes.STORE, {
                                                id: item.id,
                                            })
                                        }
                                    />
                                )}
                            />
                        )
                    }

                    {
                        /* PRODUCTS */
                        products && products.length > 0 && (
                            <FlatList
                                ItemSeparatorComponent={() => (
                                    <View style={styles.divider} />
                                )}
                                refreshing={locationLoading}
                                onRefresh={() => {}}
                                data={products}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <ProductCard
                                        title={item.name}
                                        calories={item.calories}
                                        description={item.description}
                                        distance={item.distance}
                                        price={item.price}
                                        productImage={item.image_url}
                                        store={item.store.name}
                                        storeImage={item.store.logo_url}
                                        onPress={() =>
                                            navigation.navigate(
                                                routes.PRODUCT,
                                                {
                                                    id: item.id,
                                                },
                                            )
                                        }
                                    />
                                )}
                            />
                        )
                    }
                </View>
            </Screen>
        </>
    );
};

SearchScreen.propTypes = {
    navigation: propTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    searchOptions: {
        width: '100%',
    },
    searchBar: {
        borderRadius: 40,
        paddingVertical: 5,
        backgroundColor: colors.lightGrey,
        flexDirection: 'row',
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    divider: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 0.2,
    },
});

export default SearchScreen;
