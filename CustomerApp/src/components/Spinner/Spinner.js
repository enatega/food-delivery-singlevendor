import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

function Spinner(props) {
  const { colors } = useTheme()

  return (
    <ActivityIndicator
      style={[styles.flex, styles.mainContainer]}
      {...props}
      size={props.size || 'large'}
      color={props.spinnerColor ? props.spinnerColor : colors.spinnerColor}
    />
  )
}
Spinner.propTypes = {
  backColor: PropTypes.string,
  spinnerColor: PropTypes.string,
  size: PropTypes.string
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  mainContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default Spinner
