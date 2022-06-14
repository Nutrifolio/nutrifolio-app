import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import propTypes from 'prop-types'
import NutriText from './NutriText'
import colors from '../styles/colors'

const ProductCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
          <NutriText style={styles.title}>{props.title}</NutriText>
          <NutriText style={styles.description}>{props.description}</NutriText>
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
      backgroundColor: 'yellow',
      flexDirection: 'column',
      
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
    imageContainer: {
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