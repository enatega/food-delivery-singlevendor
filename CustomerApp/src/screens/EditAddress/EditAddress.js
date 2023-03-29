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
import { editAddress } from '../../apollo/server'
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

const EDIT_ADDRESS = gql`
  ${editAddress}
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
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0021

function EditAddress() {
  const { colors } = useTheme()
  const route = useRoute()
  const styles = useStyle()
  const addressRef = useRef(null)
  const navigation = useNavigation()
  const [_id] = useState(route.params._id ?? null)
  const [selectedLabel, setSelectedLabel] = useState(
    route.params.label ?? labelValues[0].value
  )
  const [region, setRegion] = useState({
    latitude: parseFloat(route.params.latitude ?? null),
    latitudeDelta: LATITUDE_DELTA,
    longitude: parseFloat(route.params.longitude ?? null),
    longitudeDelta: LONGITUDE_DELTA
  })
  const [deliveryAddress, setDeliveryAddress] = useState(
    route.params.delivery_address ?? ''
  )
  const [deliveryDetails, setDeliveryDetails] = useState(
    route.params.details ?? ''
  )
  const [deliveryAddressError, setDeliveryAddressError] = useState('')
  const [deliveryDetailsError, setDeliveryDetailsError] = useState('')
  const regionObj = route.params.regionChange ?? null

  const [mutate, { loading }] = useMutation(EDIT_ADDRESS, {
    onCompleted,
    onError
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      title: i18n.t('editAddress')
    })
  }, [navigation])
  useEffect(() => {
    if (regionObj !== null) regionChange(regionObj)
  }, [regionObj])

  function regionChange(region) {
    Location.reverseGeocodeAsync({ ...region })
      .then(data => {
        if (data.length) {
          const location = data[0]
          const deliveryAddress = keys(location)
            .map(key => location[key])
            .join(' ')
          setDeliveryAddress(deliveryAddress)
          addressRef.current.setValue(deliveryAddress)
        }
      })
      .catch(error => {
        console.log(error)
      })
    setRegion(region)
  }

  function onCompleted(data) {
    FlashMessage({
      message: 'Address updated'
    })
    // show message here
    navigation.goBack()
  }

  function onError(error) {
    FlashMessage({
      message: `An error occured. Please try again ${error}`
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
              style={{ flex: 1 }}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
              pitchEnabled={false}
              toolbarEnabled={false}
              showsCompass={false}
              showsIndoors={false}
              rotateEnabled={false}
              showsUserLocation={false}
              followsUserLocation={false}
              showsMyLocationButton={false}
              showsPointsOfInterest={false}
              cacheEnabled={true}
              // loadingEnabled={true}
              // loadingIndicatorColor={COLORS.primary}
              initialRegion={{
                latitude: parseFloat(route.params.latitude ?? null),
                latitudeDelta: LATITUDE_DELTA,
                longitude: parseFloat(route.params.longitude ?? null),
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
                  currentScreen: 'EditAddress'
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
            contentContainerStyle={styles.subContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.upperContainer}>
              <View style={styles.labelButtonContainer}>
                <View style={alignment.PBsmall}>
                  <TextDefault H5 bold>
                    Label as
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
                          {label.title}
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
                  fontSize={scale(12)}
                  labelFontSize={scale(12)}
                  activeLineWidth={0}
                  lineWidth={0}
                  labelHeight={20}
                  maxLength={100}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={
                    !deliveryAddressError ? colors.selected : colors.errorColor
                  }
                  labelOffset={{ y1: -5 }}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={text => {
                    setDeliveryAddress(text)
                  }}
                  onBlur={() => {
                    setDeliveryAddressError(
                      !deliveryAddress.trim().length
                        ? 'Delivery address is required'
                        : null
                    )
                  }}
                />
                <FilledTextField
                  error={deliveryDetailsError}
                  label={i18n.t('deliveryDetails')}
                  labelFontSize={scale(12)}
                  activeLineWidth={0}
                  lineWidth={0}
                  labelHeight={20}
                  fontSize={scale(12)}
                  textAlignVertical="top"
                  multiline={false}
                  maxLength={30}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={
                    !deliveryDetailsError ? colors.selected : colors.errorColor
                  }
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  labelOffset={{ y1: -5 }}
                  value={deliveryDetails}
                  onChangeText={text => {
                    setDeliveryDetails(text)
                  }}
                  onBlur={() => {
                    setDeliveryDetailsError(
                      !deliveryDetails.trim().length
                        ? 'Delivery details is required'
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
                  ? 'Delivery address is required'
                  : null
                const deliveryDetailsError = !deliveryDetails.trim().length
                  ? 'Delivery details is required'
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
                        _id: _id,
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
              <TextDefault H4 bold>
                {'cancel'}
              </TextDefault>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </WrapperView>
  )
}

export default EditAddress
