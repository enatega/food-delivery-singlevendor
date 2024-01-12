import { useMutation } from '@apollo/react-hooks'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import * as Location from 'expo-location'
import gql from 'graphql-tag'
import { keys } from 'lodash'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE
} from 'react-native-maps'
import { FilledTextField } from 'react-native-material-textfield'
import i18n from '../../../i18n'
import { createAddress } from '../../apollo/server'
import {
  FlashMessage,
  Spinner,
  TextDefault,
  WrapperView
} from '../../components'
import { alignment } from '../../utils/alignment'
import { NAVIGATION_SCREEN } from '../../utils/constant'
import { scale } from '../../utils/scaling'
import useStyle from './styles'

const CREATE_ADDRESS = gql`
  ${createAddress}
`

const labelValues = [
  {
    title: 'Home',
    value: 'Home'
  },
  {
    title: 'Work',
    value: 'Work'
  },
  {
    title: 'Other',
    value: 'Other'
  }
]

const LATITUDE = 33.7001019
const LONGITUDE = 72.9735978
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0021

function NewAddress() {
  const route = useRoute()
  const styles = useStyle()
  const addressRef = useRef()
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryDetails, setDeliveryDetails] = useState('')
  const [deliveryAddressError, setDeliveryAddressError] = useState('')
  const [deliveryDetailsError, setDeliveryDetailsError] = useState('')
  const [selectedLabel, setSelectedLabel] = useState(labelValues[0].value)
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitude: LONGITUDE,
    longitudeDelta: LONGITUDE_DELTA
  })

  const regionObj = route.params ? route.params.regionChange : null

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('addAddress'),
      headerRight: null
    })
  }, [navigation])

  useEffect(() => {
    _getLocationAsync()
  }, [])

  useEffect(() => {
    if (regionObj !== null) regionChange(regionObj)
  }, [regionObj])

  const [mutate, { loading }] = useMutation(CREATE_ADDRESS, {
    onCompleted,
    onError
  })

  async function _getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      })
      const loc = {
        latitude: parseFloat(location.coords.latitude),
        latitudeDelta: LATITUDE_DELTA,
        longitude: parseFloat(location.coords.longitude),
        longitudeDelta: LONGITUDE_DELTA
      }
      setRegion(loc)
      regionChange(loc)
    } else {
      FlashMessage({
        message: i18n.t('locaPermission')
      })
    }
  }

  function regionChange(region) {
    Location.reverseGeocodeAsync({ ...region })
      .then(data => {
        if (data.length && addressRef.current !== null) {
          const location = data[0]
          const deliveryAddress = keys(location)
            .map(key => location[key])
            .join(' ')
          setDeliveryAddress(deliveryAddress)
          setRegion(region)

          addressRef.current.setValue(deliveryAddress)
        }
      })
      .catch(error => {
        console.log('Error : ', error)
      })
  }

  function onCompleted(data) {
    FlashMessage({
      message: i18n.t('addressAdded')
    })
    const cartAddress = route.params ? route.params.backScreen : null
    if (cartAddress === NAVIGATION_SCREEN.Cart) {
      navigation.navigate(NAVIGATION_SCREEN.Cart, {
        AddressObject: data.createAddress.addresses[0]
      })
    } else navigation.goBack()
  }

  function onError(error) {
    FlashMessage({
      message: `${i18n.t('AnErrorOccured')} ${error}`
    })
  }

  return (
    <WrapperView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 0}
        style={styles.flex}
        enabled>
        <View style={styles.flex}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.flex}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              cacheEnabled={true}
              showsUserLocation={false}
              initialRegion={{
                latitude: LATITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitude: LONGITUDE,
                longitudeDelta: LONGITUDE_DELTA
              }}
              region={region}
              provider={
                Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
              }
              onTouchMove={() => {
                navigation.navigate(NAVIGATION_SCREEN.FullMap, {
                  latitude: region.latitude,
                  longitude: region.longitude,
                  currentScreen: 'NewAddress'
                })
              }}>
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude
                }}>
                <Image
                  source={require('../../assets/images/markerEnatega.png')}
                  style={{ width: scale(43), height: scale(43) }}
                />
              </Marker>
            </MapView>
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.subContainer}>
              <View style={styles.upperContainer}>
                <View style={styles.labelButtonContainer}>
                  <View style={styles.labelTitleContainer}>
                    <TextDefault H5 bold>
                      {i18n.t('labelAs')}
                    </TextDefault>
                  </View>
                  <View style={styles.buttonInline}>
                    {labelValues.map((label, index) => {
                      const isSelected = selectedLabel === label.value
                      return (
                        <TouchableOpacity
                          activeOpacity={0.5}
                          key={index}
                          style={
                            isSelected ? styles.activeLabel : styles.labelButton
                          }
                          onPress={() => {
                            setSelectedLabel(label.value)
                          }}>
                          {isSelected && (
                            <Ionicons
                              name="checkmark-circle"
                              size={20}
                              color={colors.lightBackground}
                            />
                          )}
                          <TextDefault
                            textColor={
                              isSelected
                                ? colors.lightBackground
                                : colors.placeHolderColor
                            }
                            bold
                            center>
                            {i18n.t(label.title)}
                          </TextDefault>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </View>
                <View style={styles.addressContainer}>
                  <FilledTextField
                    error={deliveryAddressError}
                    ref={addressRef}
                    value={deliveryAddress}
                    label={i18n.t('fullDeliveryAddress')}
                    labelFontSize={scale(12)}
                    fontSize={scale(12)}
                    activeLineWidth={0}
                    lineWidth={0}
                    labelHeight={20}
                    maxLength={100}
                    textColor={colors.fontMainColor}
                    baseColor={colors.fontMainColor}
                    errorColor={colors.errorColor}
                    tintColor={
                      !deliveryAddressError
                        ? colors.selected
                        : colors.errorColor
                    }
                    labelTextStyle={styles.labelStyle}
                    inputContainerStyle={styles.textContainer}
                    onChangeText={text => {
                      setDeliveryAddress(text)
                    }}
                    onBlur={() => {
                      setDeliveryAddressError(
                        !deliveryAddress.trim().length
                          ? i18n.t('addressReq')
                          : null
                      )
                    }}
                  />
                  <View style={alignment.MTxSmall} />
                  <FilledTextField
                    error={deliveryDetailsError}
                    value={deliveryDetails}
                    label={i18n.t('deliveryDetails')}
                    labelFontSize={scale(12)}
                    fontSize={scale(12)}
                    textAlignVertical="top"
                    multiline={false}
                    maxLength={30}
                    activeLineWidth={0}
                    lineWidth={0}
                    labelHeight={20}
                    textColor={colors.fontMainColor}
                    baseColor={colors.fontMainColor}
                    errorColor={colors.errorColor}
                    tintColor={
                      !deliveryAddressError
                        ? colors.selected
                        : colors.errorColor
                    }
                    labelTextStyle={styles.labelStyle}
                    inputContainerStyle={styles.textContainer}
                    onChangeText={text => {
                      setDeliveryDetails(text)
                    }}
                    onBlur={() => {
                      setDeliveryDetailsError(
                        !deliveryDetails.trim().length
                          ? i18n.t('deliveryDetailsReq')
                          : null
                      )
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                disabled={loading}
                onPress={() => {
                  const deliveryAddressError = !deliveryAddress.trim().length
                    ? i18n.t('addressReq')
                    : null
                  const deliveryDetailsError = !deliveryDetails.trim().length
                    ? i18n.t('deliveryDetailsReq')
                    : null

                  setDeliveryAddressError(deliveryAddressError)
                  setDeliveryDetailsError(deliveryDetailsError)

                  if (
                    deliveryAddressError === null &&
                    deliveryDetailsError === null
                  ) {
                    mutate({
                      variables: {
                        addressInput: {
                          latitude: `${region.latitude}`,
                          longitude: `${region.longitude}`,
                          delivery_address: deliveryAddress.trim(),
                          details: deliveryDetails.trim(),
                          label: selectedLabel
                        }
                      }
                    })
                  }
                }}
                activeOpacity={0.5}
                style={styles.saveBtnContainer}>
                {loading ? (
                  <View style={styles.spinnerView}>
                    <Spinner
                      backColor="transparent"
                      spinnerColor={colors.buttonText}
                    />
                  </View>
                ) : (
                  <TextDefault textColor={colors.buttonText} H5 bold>
                    {i18n.t('saveContBtn')}
                  </TextDefault>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[alignment.PBsmall, alignment.PTsmall]}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}>
                <TextDefault H5 bold>
                  {i18n.t('cancel')}
                </TextDefault>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </WrapperView>
  )
}

export default NewAddress
