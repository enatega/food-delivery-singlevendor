/* eslint-disable react/prop-types */
import React from 'react'
import { textStyles } from '../../utils/textStyles'
import PropTypes from 'prop-types'
const {
  LeftButton
} = require('../../components/Header/HeaderIcons/HeaderIcons')

const navigationOptions = props => {
  return {
    title: 'Log in',
    headerTitleAlign: 'left',
    headerRight: null,
    // eslint-disable-next-line react/display-name
    headerLeft: () => <LeftButton iconColor={props.iconColor} icon="close" />,
    headerStyle: {
      backgroundColor: props.backColor
    },
    headerTitleStyle: {
      color: props.fontColor,
      ...textStyles.H3,
      ...textStyles.Bold
    }
  }
}
navigationOptions.propTypes = {
  iconColor: PropTypes.string,
  fontColor: PropTypes.string,
  backColor: PropTypes.string
}
export default navigationOptions
