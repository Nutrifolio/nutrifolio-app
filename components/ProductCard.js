import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import propTypes from 'prop-types'
import NutriText from './NutriText'
import colors from '../styles/colors'
import { FontAwesome } from '@expo/vector-icons'

const ProductCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>

          <NutriText style={styles.title}>{props.title}</NutriText>
          <NutriText numberOfLines={2} style={styles.description}>{props.description}</NutriText>

          <View style={styles.valuesContainer}>
            <View style={styles.values}>
              <NutriText>{props.calories}</NutriText>
              <NutriText>kcal</NutriText>
            </View>
            <View style={styles.values}>
              <NutriText>{props.price}</NutriText>
              <FontAwesome name="euro" size={14} color="black" />
            </View>
            <View style={styles.values}>
              <FontAwesome name="map-marker" size={14} color="black" />
              <NutriText>{props.distance}</NutriText>
            </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: props.image}} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 160,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: 'blue'
    },
    detailsContainer: {
      height: '100%',
      width: '65%',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
      
    },
    title: {
      fontWeight: '600',
      fontSize: 16,
      paddingBottom: 3
    },
    description: {
      fontSize: 12,
      color: colors.grey

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
      height: '100%',
      width: '35%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      height: '70%',
      width: '85%',
      resizeMode: 'cover',
      borderRadius: 10
    }
})

ProductCard.propTypes = {
    image: propTypes.string
}

export default ProductCard;