import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Platform, View } from 'react-native'
import i18n from '../../../i18n'
import { AuthContext } from '../../context/auth'
import { NAVIGATION_SCREEN } from '../../utilities/constant'
import NavItem from './NavItem/NavItem'
import Profile from './Profile/Profile'
import styles from './styles'

// constants
const datas = [
  {
    title: 'titleOrders',
    // icon:'linode',
    icon: 'shopping-bag',
    navigateTo: NAVIGATION_SCREEN.Orders
  },
  {
    title: 'titleLanguage',
    icon: 'language',
    navigateTo: NAVIGATION_SCREEN.Language
  },

  {
    title: 'titleHelp',
    icon: 'exclamation-circle',
    navigateTo: NAVIGATION_SCREEN.Help
  }
  // {
  //   title: 'titleChat',
  //   icon: 'comments-o',
  //   navigateTo: NAVIGATION_SCREEN.Chat
  // }
  // {
  //   title: 'titleLogout',
  //   icon: 'sign-out',
  //   navigateTo: 'Login'
  // }
]

function SidebBar({ navigation }) {
  const { logout } = useContext(AuthContext)

  // if (loading) return <Spinner />
  return (
    <>
      <View style={styles.flex}>
        <View style={styles.topContainer}>
          <Profile />
        </View>
        <View style={styles.botContainer}>
          {datas.map((data, ind) =>
            (Platform.OS === 'ios' && ind === 0) ||
            (Platform.OS === 'ios' && ind === 1) ? null : (
                <View key={ind} style={styles.item}>
                  <NavItem
                    onPress={async () => {
                      if (data.navigateTo === 'Login') {
                        await logout()
                        navigation.closeDrawer()
                      } else {
                        navigation.navigate(data.navigateTo)
                      }
                    }}
                    icon={data.icon}
                    title={i18n.t(data.title)}
                  />
                </View>
              )
          )}
        </View>

        <View style={styles.item}>
          <NavItem
            onPress={async () => {
              await logout()
              navigation.closeDrawer()
            }}
            icon={'sign-out'}
            title={i18n.t('titleLogout')}
          />
        </View>
      </View>
    </>
  )
}

SidebBar.propTypes = {
  navigation: PropTypes.object
}
export default SidebBar
