import { useMutation } from '@apollo/react-hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import gql from 'graphql-tag'
import React, { useContext, useEffect, useState,useLayoutEffect } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { FilledTextField } from 'react-native-material-textfield'
import Logo from '../../../assets/images/Svg/Logo'
import i18n from '../../../i18n'
import { riderLogin } from '../../apollo/mutations'
import { Spinner, TextDefault, WrapperView } from '../../components'
import { FlashMessage } from '../../components/FlashMessage/FlashMessage'
import { AuthContext } from '../../context/auth'
import { alignment } from '../../utilities/alignment'
import colors from '../../utilities/colors'
import { scale } from '../../utilities/scaling'
import useStyle from './styles'

const RIDER_LOGIN = gql`
  ${riderLogin}
`

export default function Login() {
  const styles = useStyle()
  const navigation = useNavigation()
  const [username, setUsername] = useState('rider')
  const [password, setPassword] = useState('123123')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { setTokenAsync } = useContext(AuthContext)


    useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: i18n.t('titleHelp')
    })
  }, [navigation])

  const [mutate, { loading }] = useMutation(RIDER_LOGIN, {
    onCompleted,
    onError
  })

  function validateForm() {
    let res = true
    setUsernameError('')
    setPasswordError('')

    if (!username) {
      setUsernameError(i18n.t('Usernameisrequired'))
      res = false
    }
    if (!password) {
      setPasswordError(i18n.t('Passwordisrequired'))
      res = false
    }
    return res
  }

  async function onCompleted(data) {
    FlashMessage({
      message: i18n.t('Loggedin')
    })
    await AsyncStorage.setItem('rider-id', data.riderLogin.userId)
    setTokenAsync(data.riderLogin.token)
  }
  function onError({ networkError, graphQLErrors }) {
    console.log('errors', networkError, graphQLErrors)
    let message = ''
    if (!!graphQLErrors && graphQLErrors.length) {
      message = graphQLErrors[0].message
    }
    if (!!networkError) {
      message = networkError.result.errors[0].message
    }
    FlashMessage({
      message: message
    })
  }

  return (
    <WrapperView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}>
          <View style={[styles.flex, styles.container]}>
            <Logo width={scale(130)} height={scale(130)} />
            <View style={styles.width100}>
              <TextDefault
                style={alignment.MBmedium}
                textColor={colors.placeHolderColor}>
                {i18n.t('EnteryourEmailandPassword')}
              </TextDefault>
              <FilledTextField
                defaultValue={'rider'}
                error={usernameError}
                keyboardType={'email-address'}
                label={i18n.t('EmailorPhone')}
                labelFontSize={scale(12)}
                fontSize={scale(12)}
                activeLineWidth={0}
                labelHeight={10}
                lineWidth={0}
                textColor={colors.fontMainColor}
                baseColor={colors.fontMainColor}
                errorColor={colors.textErrorColor}
                tintColor={colors.tagColor}
                labelTextStyle={styles.labelStyle}
                inputContainerStyle={styles.textContainer}
                onChangeText={text => {
                  setUsername(text.toLowerCase().trim())
                }}
              />
              <View style={styles.mt15} />
              <FilledTextField
                defaultValue={'123123'}
                error={passwordError}
                label={i18n.t('Password')}
                secureTextEntry
                labelFontSize={scale(12)}
                fontSize={scale(12)}
                activeLineWidth={0}
                labelHeight={10}
                lineWidth={0}
                textColor={colors.fontMainColor}
                baseColor={colors.fontMainColor}
                errorColor={colors.textErrorColor}
                tintColor={colors.tagColor}
                labelTextStyle={styles.labelStyle}
                inputContainerStyle={styles.textContainer}
                onChangeText={text => {
                  setPassword(text.trim())
                }}
              />
              <View style={[styles.lower_form]}>
                {loading && <Spinner />}
                {!loading && (
                  <TouchableOpacity
                    onPress={async () => {
                      if (validateForm()) {
                        let notificationToken = null
                        if (Constants.isDevice) {
                          const {
                            status: existingStatus
                          } = await Notifications.getPermissionsAsync()
                          if (existingStatus === 'granted') {
                            notificationToken = (
                              await Notifications.getExpoPushTokenAsync()
                            ).data
                          }
                        }
                        mutate({
                          variables: {
                            username: username.toLowerCase(),
                            password: password,
                            notificationToken
                          }
                        })
                      }
                    }}
                    activeOpacity={0.5}
                    style={[styles.RContainer]}>
                    <TextDefault textColor={colors.fontMainColor} H5 bold>
                      {i18n.t('loginBtn')}
                    </TextDefault>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperView>
  )
}
