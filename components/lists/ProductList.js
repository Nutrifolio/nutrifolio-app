import colors from '../../styles/colors';
import ProductCard from './ProductCard';
import propTypes from 'prop-types';
import React from 'react';
import routes from '../../navigation/routes';
import { StyleSheet, FlatList, View } from 'react-native';

const ProductList = (props) => (
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
                distance={item.distance}
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
