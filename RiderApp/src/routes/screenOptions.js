/* eslint-disable react/prop-types */
import { TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { LeftButton } from '../components'
import { ICONS_NAME } from '../utilities/constant'
import { scale } from '../utilities/scaling'
import { textStyles } from '../utilities/textStyles'

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
    color: props && props.textColor,
    ...textStyles.H3,
    ...textStyles.Bold,
    backgroundColor: 'transparent'
  },
  headerTitleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(80)
  },
  headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
  ...TransitionPresets.SlideFromRightIOS
})

export { screenOptions }
