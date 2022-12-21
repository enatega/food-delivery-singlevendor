import { ApolloProvider } from '@apollo/react-hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import i18n from './i18n'
import setupApolloClient from './src/apollo/index'
import { AuthContext } from './src/context/auth'
import { ConfigurationProvider } from './src/context/configuration'
import AppContainer from './src/routes/index'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [client, setClient] = useState(null)
  const [token, setToken] = useState(false)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const token = await AsyncStorage.getItem('rider-token')
      if (token) setToken(token)
      setAppIsReady(true)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
      } catch (e) {
        console.log(e)
      }
    })()
    loadData()
  }, [])

  const setTokenAsync = async token => {
    await AsyncStorage.setItem('rider-token', token)
    setToken(token)
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('rider-token')
      setToken(null)
    } catch (e) {
      console.log('Logout Error: ', e)
    }
  }

  async function loadData() {
    await i18n.initAsync()
    await Font.loadAsync({
      MuseoSans300: require('./assets/font/MuseoSans/MuseoSans300.ttf'),
      MuseoSans500: require('./assets/font/MuseoSans/MuseoSans500.ttf'),
      MuseoSans700: require('./assets/font/MuseoSans/MuseoSans700.ttf'),
      icomoon: require('./assets/font/icomoon.ttf')
    })
    const client = await setupApolloClient()
    await permissionForPushNotificationsAsync()
    setClient(client)
    setFontLoaded(true)
    await SplashScreen.hideAsync()
  }

  async function permissionForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        importance: Notifications.AndroidImportance.HIGH,
        vibrate: [0, 250, 250, 250]
      })
    }
  }

  if (fontLoaded && client && appIsReady) {
    return (
      <ApolloProvider client={client}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <ConfigurationProvider>
          <AuthContext.Provider value={{ token, setTokenAsync, logout }}>
            <AppContainer />
          </AuthContext.Provider>
        </ConfigurationProvider>
        <FlashMessage duration={2000} position="center" />
      </ApolloProvider>
    )
  }
  return null
}
