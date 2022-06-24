import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import propTypes from 'prop-types';
import NutriText from './NutriText';
import colors from '../styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StoreCard = (props) => {
    const { name, logo_url, location, distance } = props;
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <NutriText style={styles.title}>{name}</NutriText>
                <NutriText numberOfLines={2} style={styles.description}>
                    {location}
                </NutriText>
                <View style={styles.valuesContainer}>
                    <View style={styles.values}>
                        <MaterialCommunityIcons
                            name='map-marker'
                            size={14}
                            color='black'
                        />
                        <NutriText>{distance}</NutriText>
                    </View>
                </View>
            </View>
            <View style={styles.productImageContainer}>
                <Image source={{ uri: logo_url }} style={styles.productImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    detailsContainer: {
        height: '100%',
        width: '65%',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
    storeImageContainer: {
        height: '100%',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storeImage: {
        height: '70%',
        width: '85%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

StoreCard.propTypes = {
    name: propTypes.string.isRequired,
    logo_url: propTypes.string.isRequired,
    location: propTypes.string.isRequired,
    distance: propTypes.number.isRequired,
};

export default StoreCard;
