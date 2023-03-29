import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import colors from '../../utilities/colors'
import { useNavigation } from '@react-navigation/native'

function Loading() {
  const navigation = useNavigation()
  useEffect(() => {
    loadData()
  }, [])
  async function loadData() {
    // ask permissions for app here
    await permissionForPushNotificationsAsync()
    checkAuthenticated()
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
    }
  }
  async function checkAuthenticated() {
    try {
      const userToken = await AsyncStorage.getItem('rider-token')
      if (userToken) {
        navigation.navigate('Drawer')
        return
      }
    } catch (error) {}
    await AsyncStorage.removeItem('rider-token')
    navigation.navigate('Auth', { screen: 'Login' })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.spinnerColor} />
    </View>
  )
}

export default Loading
