import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import propTypes from 'prop-types'

const ProductCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
          
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: props.image}} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 180,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: 'yellow'
    },
    detailsContainer: {
      height: '100%',
      width: '65%',
      backgroundColor: 'blue',
      flexDirection: 'column',
      
    },
    imageContainer: {
      height: '100%',
      width: '35%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      height: '60%',
      width: '85%',
      resizeMode: 'cover',
      borderRadius: 10
    }
})

ProductCard.propTypes = {
    image: propTypes.string
}

export default ProductCard;