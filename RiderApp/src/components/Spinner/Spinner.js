import React from 'react'
import { ActivityIndicator } from 'react-native'
import colors from '../../utilities/colors'
import PropTypes from 'prop-types'

function Spinner(props) {
  return (
    <ActivityIndicator
      size="large"
      color={props.spinnerColor ?? colors.spinnerColor}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
  )
}
Spinner.propTypes = {
  spinnerColor: PropTypes.string
}
export default Spinner
