import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'react-native'
import { styles } from './styles'

function ImageHeader(props) {
  return (
    <Image
      style={styles.backgroundImage}
      resizeMode="cover"
      source={{ uri: props.image }}
      defaultSource={require('../../../assets/images/food_placeholder.png')}></Image>
  )
}
ImageHeader.propTypes = {
  image: PropTypes.string
}
export default ImageHeader
