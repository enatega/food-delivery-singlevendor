/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Image, Platform, View } from 'react-native'
import { isObject } from 'validate.js'
import Spinner from '../Spinner/Spinner'
import useStyle from './styles'

const iosPlacholder = require('../../assets/images/food_placeholder.png')
const PLACEHOLDER = require('../../assets/images/imagePlaceholder.png')

function EnategaImage({
  imgSource,
  imgStyle = null,
  resizeMode = 'cover',
  spinnerProps
}) {
  const styles = useStyle()
  const [startImgLoading, setStartImgLoading] = useState(false)

  const imageUrl = isObject(imgSource)
    ? { ...imgSource, cache: 'force-cache' }
    : imgSource || PLACEHOLDER
  const style = imgStyle || styles.imgContainer

  const androidImage = (
    <Image
      source={imageUrl}
      style={[styles.imgResponsive, style]}
      onLoadStart={() => setStartImgLoading(true)}
      onLoadEnd={() => setStartImgLoading(false)}
      resizeMode={imgSource ? resizeMode : 'contain'}
    />
  )

  const iosImage = (
    <Image
      source={imageUrl}
      defaultSource={iosPlacholder}
      style={[styles.imgResponsive, style]}
      resizeMode={imgSource ? resizeMode : 'contain'}
    />
  )

  return (
    <View style={style}>
      {startImgLoading && (
        <Spinner
          animating={startImgLoading}
          size="small"
          style={style}
          {...spinnerProps}
        />
      )}
      {Platform.OS === 'ios' ? iosImage : androidImage}
    </View>
  )
}

export default React.memo(EnategaImage)
