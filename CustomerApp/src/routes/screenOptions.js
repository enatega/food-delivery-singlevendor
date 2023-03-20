/* eslint-disable react/prop-types */
import { TransitionPresets } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import React from 'react'
import {
  LeftButton,
  RightButton
} from '../components/Header/HeaderIcons/HeaderIcons'
import { ICONS_NAME } from '../utils/constant'
import { scale } from '../utils/scaling'
import { textStyles } from '../utils/textStyles'

const screenOptions = props => ({
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: props.textColor,
    ...textStyles.H4,
    ...textStyles.Bold,
    backgroundColor: 'transparent'
  },
  headerTitleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(80)
  },
  headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
  headerRight: () => <RightButton icon={ICONS_NAME.Cart} />,
  ...TransitionPresets.SlideFromRightIOS
})

screenOptions.propTypes = {
  textColor: PropTypes.string
}
export default screenOptions
