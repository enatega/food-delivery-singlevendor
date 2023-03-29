import PropTypes from 'prop-types'
import React from 'react'
import { View, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useStyle from './styles'

const BACKGROUND_IMAGE = require('../../../assets/images/ui/BG.png')
function MainWrapper({ children }) {
  const styles = useStyle()
  const inset = useSafeAreaInsets()

  return (
    <View style={[styles.flex, { paddingBottom: inset.bottom }]}>
      <Image style={styles.imageContainer} source={BACKGROUND_IMAGE} />
      {children}
    </View>
  )
}

MainWrapper.propTypes = {
  children: PropTypes.node
}

export default React.memo(MainWrapper)
