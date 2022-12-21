import React from 'react'
import { Image } from 'react-native'

import styles from './styles'

const FdFullLogo = () => {
  return (
    <Image
      style={styles.logo_image}
      source={require('../../../assets/images/ui/transparent-icon.png')}
      resizeMode="contain"
    />
  )
}

export default FdFullLogo
