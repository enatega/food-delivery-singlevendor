import { useMutation } from '@apollo/react-hooks'
import { useNavigation, useTheme } from '@react-navigation/native'
import * as Device from 'expo-device'
import * as Localization from 'expo-localization'
import * as Notifications from 'expo-notifications'
import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { FilledTextField } from 'react-native-material-textfield'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createUser } from '../../apollo/server'
import {
  CustomIcon,
  EnategaImage,
  FlashMessage,
  Spinner,
  TextDefault,
  WrapperView
} from '../../components'
import UserContext from '../../context/User'
import { alignment } from '../../utils/alignment'
import Analytics from '../../utils/analytics'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../../utils/constant'
// eslint-disable-next-line camelcase
import country_codes from '../../utils/country_codes'
import { scale, verticalScale } from '../../utils/scaling'
import useStyle from './styles'

const CREATEUSER = gql`
  ${createUser}
`

const Logo = require('../../../assets/logo.png')

function Register() {
  const styles = useStyle()
  const { colors } = useTheme()
  const navigation = useNavigation()
  const inset = useSafeAreaInsets()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [lastnameError, setLastnameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [firstnameError, setFirstnameError] = useState(null)

  const { setTokenAsync } = useContext(UserContext)

  const [mutate] = useMutation(CREATEUSER, { onCompleted, onError })

  function validateCredentials() {
    let result = true

    setEmailError(null)
    setPasswordError(null)
    setPhoneError(null)
    setFirstnameError(null)
    setLastnameError(null)

    const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email.trim())) {
      setEmailError('Provide a valid email address')
      result = false
    }
    if (!password) {
      setPasswordError('Password is required')
      result = false
    }
    const phoneRegex = /^\d{11,15}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError('Provide a valid phone number')
      result = false
    }
    const nameRegex = /^[A-Za-z]{1,15}$/
    if (!nameRegex.test(firstname)) {
      setFirstnameError('First name is required')
      result = false
    }
    if (!nameRegex.test(lastname)) {
      setLastnameError('Last name is required')
      result = false
    }
    return result
  }

  async function onCompleted(data) {
    try {
      const trackingOpts = {
        id: data.createUser.userId,
        usernameOrEmail: data.createUser.email
      }
      Analytics.identify(data.createUser.userId, trackingOpts)
      Analytics.track(Analytics.events.USER_CREATED_ACCOUNT, trackingOpts)
      setTokenAsync(data.createUser.token)
      navigation.navigate(NAVIGATION_SCREEN.Menu)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  function onError(error) {
    try {
      FlashMessage({
        message: error.graphQLErrors[0].message
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function mutateLogin(user) {
    setLoading(true)
    let notificationToken = null
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    if (existingStatus === 'granted' && Device.isDevice) {
      notificationToken = (await Notifications.getExpoPushTokenAsync()).data
    }
    mutate({ variables: { ...user, notificationToken } })
  }

  function renderJoinAction() {
    if (loading) return <Spinner />
    return (
      <TouchableOpacity
        style={styles.joinBtn}
        activeOpacity={0.7}
        onPress={async() => {
          if (validateCredentials()) {
            const user = {
              phone: phone.trim(),
              email: email.toLowerCase().trim(),
              password: password,
              name: firstname + ' ' + lastname,
              picture: ''
            }
            mutateLogin(user)
          }
        }}>
        <TextDefault bold>Signup</TextDefault>
      </TouchableOpacity>
    )
  }

  function updateCountryCode() {
    const timezone = country_codes.find(
      value =>
        value.timezone.toLowerCase() === Localization.timezone.toLowerCase()
    )
    if (!phone) {
      setPhone(timezone.country_code)
    }
  }

  return (
    <WrapperView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          style={[styles.flex, { paddingTop: inset.top }]}
          contentContainerStyle={{ flexGrow: 1, paddingTop: verticalScale(20) }}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
          <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.backBtnWidth, styles.backBtn]}>
                <CustomIcon
                  name={ICONS_NAME.Back}
                  size={scale(20)}
                  color={colors.iconColor}
                />
              </TouchableOpacity>
              <TextDefault center H4 bold>
                Signup
              </TextDefault>
              <View style={styles.backBtnWidth} />
            </View>
            <View style={styles.subContainer}>
              <View style={[styles.flex, styles.upperContainer]}>
                <EnategaImage
                  imgStyle={[
                    styles.imgResponsive,
                    { backgroundColor: 'transparent' }
                  ]}
                  imgSource={Logo}
                  spinnerProps={{ style: styles.loadingView }}
                />
              </View>
              <View style={styles.width100}>
                <FilledTextField
                  error={firstnameError}
                  label="First name"
                  labelFontSize={scale(12)}
                  fontSize={scale(12)}
                  labelHeight={10}
                  activeLineWidth={0}
                  lineWidth={0}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={text => {
                    setFirstname(text.trim())
                  }}
                  maxLength={15}
                />
                <FilledTextField
                  error={lastnameError}
                  label="Last name"
                  labelFontSize={scale(12)}
                  fontSize={scale(12)}
                  labelHeight={10}
                  activeLineWidth={0}
                  lineWidth={0}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={text => {
                    setLastname(text.trim())
                  }}
                  maxLength={15}
                />
                <FilledTextField
                  error={emailError}
                  keyboardType={'email-address'}
                  label="Email address"
                  labelFontSize={scale(12)}
                  fontSize={scale(12)}
                  labelHeight={10}
                  activeLineWidth={0}
                  lineWidth={0}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={text => {
                    setEmail(text.toLowerCase().trim())
                  }}
                />
                <FilledTextField
                  prefix="+"
                  value={phone}
                  error={phoneError}
                  keyboardType={'phone-pad'}
                  label="Mobile number"
                  labelFontSize={scale(12)}
                  activeLineWidth={0}
                  lineWidth={0}
                  fontSize={scale(12)}
                  labelHeight={10}
                  onFocus={updateCountryCode}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={text => {
                    setPhone(text.trim())
                  }}
                />
                <FilledTextField
                  error={passwordError}
                  label="Password"
                  secureTextEntry={true}
                  labelFontSize={scale(12)}
                  fontSize={scale(12)}
                  labelHeight={10}
                  activeLineWidth={0}
                  lineWidth={0}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={text => {
                    setPassword(text.trim())
                  }}
                />
                <View style={[styles.marginTop5]}>{renderJoinAction()}</View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate(NAVIGATION_SCREEN.ForgotPassword)
                  }>
                  <TextDefault style={alignment.MTsmall} bold center>
                    Forgot password?
                  </TextDefault>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperView>
  )
}

export default Register
