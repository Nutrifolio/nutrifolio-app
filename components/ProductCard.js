import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import propTypes from 'prop-types'

const ProductCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
          
      </View>
      <Image source={props.image} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {},
    detailsContainer: {},
    image: {}
})

ProductCard.propTypes = {
    image: propTypes.string
}

export default ProductCard;