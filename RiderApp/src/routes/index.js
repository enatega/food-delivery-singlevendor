import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'
import React, { useContext, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { LeftButton } from '../components/Header/HeaderIcons/HeaderIcons'
import Sidebar from '../components/Sidebar/Sidebar'
import { AuthContext } from '../context/auth'
import { UserProvider } from '../context/user'
import {
  Chat,
  Help,
  HelpBrowser,
  Language,
  Login,
  OrderDetail,
  Orders
} from '../screens'
import colors from '../utilities/colors'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../utilities/constant'
import navigationService from './navigationService'
import { screenOptions } from './screenOptions'
import styles from './styles'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function Auth() {
  return (
    <Stack.Navigator
      screenOptions={screenOptions({ textColor: colors.fontMainColor })}>
      <Stack.Screen name={NAVIGATION_SCREEN.Login} component={Login} />
    </Stack.Navigator>
  )
}
function Main() {
  let listener = null
  let animatedStyle = {}
  let opacity
  let OuterWindowSlide, InnerWindowSlide
  useEffect(() => {
    // if (!loadingProfile && !loadingAssigned && !loadingUnAssigned)
    listener = Notifications.addNotificationReceivedListener(
      _handleNotification
    )
    return () => {
      listener && listener.remove()
    }
  }, [])

  function _handleNotification(notification) {
    try {
      if (notification.origin === 'selected') {
        if (notification.data.order) {
          navigationService.navigate('OrderDetail', {
            id: notification.data._id
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })
    const subscription = Notifications.addNotificationResponseReceivedListener(
      _handleNotification
    )
    return () => subscription.remove()
  }, [])

  return (
    <UserProvider>
      <Drawer.Navigator
        drawerStyle={{
          flex: 1,
          backgroundColor: colors.fontMainColor,
          width: '60%',
          justifyContent: 'space-between',
          borderRightWidth: 0,
          shadowOpacity: 0,
          elevation: 0
        }}
        sceneContainerStyle={{ backgroundColor: colors.fontMainColor }}
        overlayColor="transparent"
        drawerType="slide"
        drawerContent={props => {
          const scale = Animated.interpolateNode(props.progress, {
            inputRange: [0, 1],
            outputRange: [1, 0.7]
          })
          const Animatedopacity = Animated.interpolateNode(props.progress, {
            inputRange: [0, 0.6, 1],
            outputRange: [0, 0, 1]
          })
          const AnimatedOuterSlide = Animated.interpolateNode(props.progress, {
            inputRange: [0, 1],
            outputRange: [0, -35]
          })
          const AnimatedInnerSlide = Animated.interpolateNode(props.progress, {
            inputRange: [0, 1],
            outputRange: [0, -15]
          })
          const borderRadius = Animated.interpolateNode(props.progress, {
            inputRange: [0, 1],
            outputRange: [0, 20]
          })
          animatedStyle = { borderRadius, transform: [{ scale }] }
          opacity = Animatedopacity
          OuterWindowSlide = AnimatedOuterSlide
          InnerWindowSlide = AnimatedInnerSlide
          return <Sidebar {...props} />
        }}>
        <Drawer.Screen name="noDrawer">
          {props => (
            <NoDrawer
              {...props}
              style={animatedStyle}
              opacity={opacity}
              OuterWindowSlide={OuterWindowSlide}
              InnerWindowSlide={InnerWindowSlide}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </UserProvider>
  )
}
function NoDrawer({ style, opacity = 1, OuterWindowSlide, InnerWindowSlide }) {
  return (
    <React.Fragment>
      <Animated.View
        style={[styles.outerView, style, { marginLeft: OuterWindowSlide }]}
      />
      <Animated.View
        style={[styles.innerView, style, { marginLeft: InnerWindowSlide }]}
      />
      <Animated.View style={[styles.animatedView, style]}>
        <Stack.Navigator
          headerMode="screen"
          initialRouteName={NAVIGATION_SCREEN.Orders}
          screenOptions={screenOptions({
            textColor: colors.fontSecondColor
          })}>
          <Stack.Screen
            name={NAVIGATION_SCREEN.Orders}
            component={Orders}
            options={{
              headerLeft: () => (
                <LeftButton
                  icon={ICONS_NAME.Menu}
                  iconColor={colors.fontSecondColor}
                />
              )
            }}
          />
          <Stack.Screen
            name={NAVIGATION_SCREEN.OrderDetail}
            component={OrderDetail}
          />
          <Stack.Screen name={NAVIGATION_SCREEN.Help} component={Help} />
          <Stack.Screen
            name={NAVIGATION_SCREEN.Language}
            component={Language}
          />
          <Stack.Screen name={NAVIGATION_SCREEN.Chat} component={Chat} />
          <Stack.Screen
            name={NAVIGATION_SCREEN.HelpBrowser}
            component={HelpBrowser}
          />
        </Stack.Navigator>
      </Animated.View>
    </React.Fragment>
  )
}
function AppContainer() {
  const { token } = useContext(AuthContext)
  return (
    // <SafeAreaProvider>
    <NavigationContainer
      ref={ref => {
        navigationService.setGlobalRef(ref)
      }}>
      {token ? <Main /> : <Auth />}
    </NavigationContainer>
    // </SafeAreaProvider>
  )
}
export default AppContainer
