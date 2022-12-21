import {
  CommonActions,
  useNavigation,
  useTheme
} from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useCallback, useContext } from 'react'
import { Pressable, View } from 'react-native'
import UserContext from '../../../context/User'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../../../utils/constant'
import { scale } from '../../../utils/scaling'
import { CustomIcon } from '../../CustomIcon'
import { FlashMessage } from '../../FlashMessage/FlashMessage'
import TextDefault from '../../Text/TextDefault/TextDefault'
import useStyles from './styles'

function HeaderIcon({ icon, iconColor, iconSize = scale(20) }) {
  const { colors } = useTheme()
  return (
    <CustomIcon
      name={icon}
      size={iconSize}
      color={iconColor || colors.iconColor}
    />
  )
}

function LeftButton(props) {
  const { icon, outerView, iconColor } = props
  const styles = useStyles()
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

function RightButton(props) {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const {
    outerView,
    onPress = () => null,
    icon = null,
    iconColor = colors.iconColor,
    iconSize = scale(20)
  } = props
  const styles = useStyles()
  const { cartCount } = useContext(UserContext)

  const navigateCart = useCallback(() => {
    if (cartCount > 0) {
      navigation.navigate(NAVIGATION_SCREEN.Cart)
    } else {
      FlashMessage({
        message: 'Cart is empty.'
      })
    }
  }, [cartCount])

  switch (icon) {
    case ICONS_NAME.Cart:
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
            onPress={() => navigateCart()}>
            <HeaderIcon iconColor={iconColor} icon={icon} />
            <View style={styles.cartCount}>
              <TextDefault small bold textColor={colors.white}>
                {cartCount}
              </TextDefault>
            </View>
          </Pressable>
        </View>
      )
    case ICONS_NAME.Filter:
    case ICONS_NAME.Pencil:
    case ICONS_NAME.Cross:
    case ICONS_NAME.Plus:
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
            onPress={onPress}>
            <HeaderIcon iconColor={iconColor} icon={icon} iconSize={iconSize} />
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
RightButton.propTypes = {
  outerView: PropTypes.object,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func
}

export { HeaderIcon, LeftButton, RightButton }
