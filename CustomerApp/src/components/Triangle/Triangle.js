import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import useStyle from './styles'

const Triangle = props => {
  const styles = useStyle()

  return <View style={[styles.triangle, props.style]} />
}

Triangle.propTypes = {
  style: PropTypes.object
}

export default Triangle
