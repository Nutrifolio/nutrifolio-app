import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import propTypes from 'prop-types';
import NutriText from './NutriText';
import colors from '../styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProductCard = (props) => {
    const kcal = 'kcal'; // TODO configure calorie units
    let printableDist;
    if (props.distance < 1) {
        printableDist = Math.round(props.distance * 1000)
            .toString()
            .concat('m');
    } else {
        printableDist = props.distance.toFixed(2).concat('km');
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <View style={styles.detailsContainer}>
                <NutriText style={styles.title}>{props.title}</NutriText>
                <NutriText numberOfLines={2} style={styles.description}>
                    {props.description}
                </NutriText>

                <View style={styles.valuesContainer}>
                    <View style={styles.values}>
                        <NutriText>{props.calories.toString()}</NutriText>
                        <NutriText>{kcal}</NutriText>
                    </View>
                    <View style={styles.values}>
                        <NutriText>{props.price.toString()}</NutriText>
                        <MaterialCommunityIcons
                            name='currency-eur'
                            size={14}
                            color='black'
                        />
                    </View>
                    <View style={styles.values}>
                        <MaterialCommunityIcons
                            name='map-marker'
                            size={14}
                            color='black'
                        />
                        <NutriText>{printableDist}</NutriText>
                    </View>
                </View>

                <View style={styles.storeContainer}>
                    <Image
                        source={{ uri: props.storeImage }}
                        style={styles.storeImage}
                    />
                    <NutriText style={styles.storeName}>
                        {props.store}
                    </NutriText>
                </View>
            </View>
            <View style={styles.productImageContainer}>
                <Image
                    source={{ uri: props.productImage }}
                    style={styles.productImage}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    detailsContainer: {
        height: '100%',
        width: '65%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        paddingBottom: 3,
    },
    description: {
        fontSize: 12,
        color: colors.grey,
    },
    valuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    values: {
        flexDirection: 'row',
        fontSize: 14,
        alignItems: 'center',
    },
    storeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storeImage: {
        borderRadius: 100,
        resizeMode: 'center',
        width: 25,
        height: 25,
    },
    storeName: {
        fontSize: 12,
        fontWeight: '600',
        paddingLeft: 10,
    },
    productImageContainer: {
        height: '100%',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        height: '70%',
        width: '85%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

ProductCard.propTypes = {
    title: propTypes.string,
    description: propTypes.string,
    calories: propTypes.number,
    price: propTypes.number,
    distance: propTypes.number,
    storeImage: propTypes.string,
    store: propTypes.string,
    productImage: propTypes.string,
    onPress: propTypes.func,
};

export default ProductCard;
