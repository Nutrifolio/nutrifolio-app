import colors from '../../styles/colors';
import haversine from 'haversine-distance';
import ProductCard from './ProductCard';
import propTypes from 'prop-types';
import routes from '../../navigation/routes';
import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import UserContext from '../../auth/userContext';

const ProductList = (props) => {
    const { location } = useContext(UserContext);

    const calculateDistance = ({ lat, lng }) => {
        const productLocation = {
            latitude: lat,
            longitude: lng,
        };
        return haversine(productLocation, location) / 1000;
    };

    return (
        <FlatList
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            data={props.data}
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ProductCard
                    title={item.name}
                    calories={item.calories}
                    description={item.description}
                    distance={
                        item.distance
                            ? item.distance
                            : calculateDistance({
                                  lat: item.store.lat,
                                  lng: item.store.lng,
                              })
                    }
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
        />
    );
};

ProductList.propTypes = {
    data: propTypes.array.isRequired,
    navigation: propTypes.object.isRequired,
    onRefresh: propTypes.func,
    refreshing: propTypes.bool,
};

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 0.2,
    },
});

export default ProductList;
