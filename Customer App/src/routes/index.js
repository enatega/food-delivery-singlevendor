/* eslint-disable react/prop-types */
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import Animated from 'react-native-reanimated'
import {
  initialWindowMetrics,
  SafeAreaProvider
} from 'react-native-safe-area-context'
import { TextDefault, LeftButton, Sidebar } from '../components'
import {
  Addresses,
  Cart,
  CartAddress,
  Chat,
  CreateAccount,
  EditAddress,
  ForgotPassword,
  FullMap,
  Help,
  HelpBrowser,
  ItemDetail,
  Login,
  Menu,
  MenuItems,
  MyOrders,
  NewAddress,
  OrderDetail,
  Paypal,
  Profile,
  RateAndReview,
  Register,
  SelectVoucher,
  Settings,
  StripeCheckout
} from '../screens'
import { THEME } from '../Theme'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../utils/constant'
import navigationService from './navigationService'
import screenOptions from './screenOptions'
import styles from './styles'

const NavigationStack = createStackNavigator()
const MainStack = createStackNavigator()
const SideDrawer = createDrawerNavigator()

function Drawer() {
  const { colors } = useTheme()
  let animatedStyle = {}
  let opacity
  let OuterWindowSlide, InnerWindowSlide
  return (
    <SideDrawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={{
        flex: 1,
        backgroundColor: colors.drawerBackground,
        width: '60%',
        justifyContent: 'space-between',
        borderRightWidth: 0,
        shadowOpacity: 0,
        elevation: 0
      }}
      sceneContainerStyle={{ backgroundColor: colors.drawerBackground }}
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
      <SideDrawer.Screen name="noDrawer">
        {props => (
          <NoDrawer
            {...props}
            style={animatedStyle}
            opacity={opacity}
            OuterWindowSlide={OuterWindowSlide}
            InnerWindowSlide={InnerWindowSlide}
          />
        )}
      </SideDrawer.Screen>
    </SideDrawer.Navigator>
  )
}
function NoDrawer({ style, opacity = 1, OuterWindowSlide, InnerWindowSlide }) {
  const { colors } = useTheme()

  return (
    <React.Fragment>
      <Animated.View
        style={[styles.outerView, style, { marginLeft: OuterWindowSlide }]}
      />
      <Animated.View
        style={[styles.innerView, style, { marginLeft: InnerWindowSlide }]}
      />
      <Animated.View style={[styles.animatedView, style]}>
        <NavigationStack.Navigator
          mode="modal"
          screenOptions={screenOptions({
            textColor: colors.headerTextColor
          })}>
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Menu}
            component={Menu}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.MenuItems}
            component={MenuItems}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Cart}
            component={Cart}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Profile}
            component={Profile}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Addresses}
            component={Addresses}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.NewAddress}
            component={NewAddress}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.EditAddress}
            component={EditAddress}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.FullMap}
            component={FullMap}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.CartAddress}
            component={CartAddress}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Coupon}
            component={SelectVoucher}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Help}
            component={Help}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Chat}
            component={Chat}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.HelpBrowser}
            component={HelpBrowser}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Settings}
            component={Settings}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Paypal}
            component={Paypal}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.ItemDetail}
            component={ItemDetail}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.MyOrders}
            component={MyOrders}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.OrderDetail}
            component={OrderDetail}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.RateAndReview}
            component={RateAndReview}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.StripeCheckout}
            component={StripeCheckout}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.CreateAccount}
            options={{ headerShown: false }}
            component={CreateAccount}
          />
          <NavigationStack.Screen
            options={{ headerShown: false }}
            name={NAVIGATION_SCREEN.Login}
            component={Login}
          />
          <NavigationStack.Screen
            options={{ headerShown: false }}
            name={NAVIGATION_SCREEN.Register}
            component={Register}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.ForgotPassword}
            options={{ headerShown: false }}
            component={ForgotPassword}
          />
        </NavigationStack.Navigator>
      </Animated.View>
      <Animated.View style={[styles.closeView, { opacity: opacity }]}>
        <TextDefault H4 medium>
          {'Close X'}
        </TextDefault>
      </Animated.View>
    </React.Fragment>
  )
}

function AppContainer() {
  const colorScheme = useColorScheme()
  function _handleNotification(notification) {
    try {
      if (notification.origin === 'selected') {
        if (notification.data.order) {
          navigationService.navigate(NAVIGATION_SCREEN.OrderDetail, {
            _id: notification.data._id
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async() => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })
    const subscription =
      Notifications.addNotificationResponseReceivedListener(_handleNotification)
    return () => subscription.remove()
  }, [])
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        theme={colorScheme === 'dark' ? THEME.Dark : THEME.Light}
        ref={ref => {
          navigationService.setGlobalRef(ref)
          Notifications.addNotificationReceivedListener(_handleNotification)
        }}>
        <MainStack.Navigator
          headerMode="none"
          initialRouteName={NAVIGATION_SCREEN.Drawer}>
          <MainStack.Screen
            name={NAVIGATION_SCREEN.Drawer}
            component={Drawer}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppContainer
