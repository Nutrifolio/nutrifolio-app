import ActivityIndicator from '../components/ActivityIndicator';
import colors from '../styles/colors';
import FillableIconButton from '../components/buttons/FillableIconButton';
import FilterModal from '../components/filters/FilterModal';
import NutriTextInput from '../components/NutriTextInput';
import ProductList from '../components/lists/ProductList';
import propTypes from 'prop-types';
import Screen from '../components/Screen';
import StoreList from '../components/lists/StoreList';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import UserContext from '../auth/userContext';
import React, { useState, useContext, useEffect } from 'react';
import { searchStore } from '../api/storeApi';
import { filterProducts, getFavorites, getRecents } from '../api/productApi';
import { StyleSheet, Image, View } from 'react-native';

const SearchScreen = ({ navigation }) => {
    const filterApi = useApi(filterProducts);
    const favoritesApi = useApi(getFavorites);
    const recentsApi = useApi(getRecents);
    const storesApi = useApi(searchStore);
    const { location } = useContext(UserContext);
    const { accessToken } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [pressed, setPressed] = useState('none');
    const [data, setData] = useState([]);
    const [render, setRender] = useState('');

    // Filter request
    useEffect(() => {
        if (filterApi.data && filterApi.data.products && !filterApi.loading) {
            setData(filterApi.data.products);
            setRender('products');
        }
        return () => {
            setData([]);
            setRender('');
        };
    }, [filterApi.data, filterApi.loading]);

    // Favorites request
    useEffect(() => {
        if (
            favoritesApi.data &&
            favoritesApi.data.favorites &&
            !favoritesApi.loading
        ) {
            setData(favoritesApi.data.favorites);
            setRender('products');
        }
        return () => {
            setData([]);
            setRender('');
        };
    }, [favoritesApi.data, favoritesApi.loading]);

    // Recents request
    useEffect(() => {
        if (recentsApi.data && recentsApi.data.recents && !recentsApi.loading) {
            setData(recentsApi.data.recents);
            setRender('products');
        }
        return () => {
            setData([]);
            setRender('');
        };
    }, [recentsApi.data, recentsApi.loading]);

    // Search request
    useEffect(() => {
        if (storesApi.data && storesApi.data.stores && !storesApi.loading) {
            setData(storesApi.data.stores);
            setRender('stores');
        }
        return () => {
            setData([]);
            setRender('');
        };
    }, [storesApi.data, storesApi.loading]);

    const handleToggleFilter = () => {
        if (pressed !== 'filter') {
            setPressed('filter');
            setModalVisible(!modalVisible);
        } else {
            setPressed('none');
        }
    };

    const handleSubmitFilter = async (body) => {
        const { latitude, longitude } = location;
        body.lat = latitude;
        body.lng = longitude;
        setModalVisible(false);
        await filterApi.request(body);
    };

    const handleToggleLiked = async () => {
        if (pressed !== 'favorites') {
            setPressed('favorites');
            await favoritesApi.request(accessToken);
        } else {
            setPressed('none');
        }
    };

    const handleToggleRecent = async () => {
        if (pressed !== 'recents') {
            setPressed('recents');
            await recentsApi.request(accessToken);
        } else {
            setPressed('none');
        }
    };

    const handleSearch = async () => {
        await storesApi.request(
            searchText,
            location.latitude,
            location.longitude,
            200,
        );
    };

    // XXX Not allowing inline styles leads to this mess
    let opacityStyle = { opacity: 1 };
    modalVisible ? (opacityStyle.opacity = 0.3) : (opacityStyle.opacity = 1);

    // To anyone who reads this mess, I apologize
    return (
        <>
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
                            onPressIn={() => setPressed('search')}
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
                                pressed={pressed === 'favorites'}
                                onPress={handleToggleLiked}
                            />
                            <FillableIconButton
                                text='Recent'
                                icon='clock-outline'
                                iconFilled='clock'
                                pressed={pressed === 'recents'}
                                onPress={handleToggleRecent}
                            />
                        </View>
                    </View>
                    <FilterModal
                        toggleModal={() => handleToggleFilter()}
                        visible={modalVisible}
                        onSubmit={handleSubmitFilter}
                    />
                    <ActivityIndicator
                        visible={
                            storesApi.loading ||
                            recentsApi.loading ||
                            favoritesApi.loading ||
                            filterApi.loading
                        }
                    />
                    {!(data && data.length) && (
                        <Image
                            source={require('../assets/no_results.png')}
                            style={styles.image}
                        />
                    )}
                    {render === 'stores' && (
                        <StoreList data={data} navigation={navigation} />
                    )}

                    {render === 'products' && (
                        <ProductList data={data} navigation={navigation} />
                    )}
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
});

export default SearchScreen;
