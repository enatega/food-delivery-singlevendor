import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'

const DEFAULT_SIZE_MULTIPLIER = 0.7

function RadioButton(props) {
  const { colors } = useTheme()

  const {
    size = 16,
    innerColor = colors.radioColor,
    outerColor = colors.radioOuterColor,
    isSelected = false,
    onPress = () => null
  } = props

  const outerStyle = {
    borderColor: isSelected ? outerColor : colors.fontSecondColor,
    width: size + size * DEFAULT_SIZE_MULTIPLIER,
    height: size + size * DEFAULT_SIZE_MULTIPLIER,
    borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
    borderWidth: isSelected ? size / 2 : 1
  }

  const innerStyle = {
    width: size / 2,
    height: size / 2,
    borderRadius: size / 2,
    backgroundColor: innerColor
  }

  return (
    <TouchableOpacity style={[styles.radio, outerStyle]} onPress={onPress}>
      {isSelected ? <View style={innerStyle} {...props} /> : null}
    </TouchableOpacity>
  )
}

RadioButton.propTypes = {
  size: PropTypes.number,
  innerColor: PropTypes.string,
  outerColor: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func
}

export default RadioButton
