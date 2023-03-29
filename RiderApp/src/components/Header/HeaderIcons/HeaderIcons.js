import {
  CommonActions,
  useNavigation,
  useTheme
} from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { Pressable, View } from 'react-native'
import colors from '../../../utilities/colors'
import { ICONS_NAME } from '../../../utilities/constant'
import { scale } from '../../../utilities/scaling'
import { CustomIcon } from '../../CustomIcon'
import styles from './styles'

function HeaderIcon({ icon, iconColor, iconSize = scale(25) }) {
  return (
    <CustomIcon
      name={icon}
      size={iconSize}
      color={iconColor || colors.fontSecondColor}
    />
  )
}

function LeftButton(props) {
  const { icon, outerView, iconColor } = props
  const navigation = useNavigation()
  const { colors } = useTheme()

  switch (icon) {
    case ICONS_NAME.Menu:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1
              }
            ]}
            onPress={() => navigation.toggleDrawer()}>
            <HeaderIcon iconColor={iconColor} icon={icon} />
          </Pressable>
        </View>
      )
    case ICONS_NAME.Back:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1
              }
            ]}
            onPress={() => navigation.goBack()}>
            <HeaderIcon iconColor={iconColor} icon={icon} />
          </Pressable>
        </View>
      )
    case ICONS_NAME.Cross:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1
              }
            ]}
            onPress={() =>
              navigation.dispatch(state => {
                const routes = state.routes.filter(r => r.name === 'Menu')
                return CommonActions.reset({
                  ...state,
                  routes,
                  index: 0
                })
              })
            }>
            <HeaderIcon iconColor={iconColor} icon={icon} />
          </Pressable>
        </View>
      )
    default:
      return null
  }
}

HeaderIcon.propTypes = {
  outerView: PropTypes.object,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number
}
LeftButton.propTypes = {
  outerView: PropTypes.object,
  icon: PropTypes.string,
  iconColor: PropTypes.string
}

export { HeaderIcon, LeftButton }
