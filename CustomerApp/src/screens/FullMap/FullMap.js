import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import * as Location from 'expo-location'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { FlashMessage, TextDefault, WrapperView } from '../../components'
import { NAVIGATION_SCREEN } from '../../utils/constant'
import { scale } from '../../utils/scaling'
import useStyle from './styles'
import i18n from '../../../i18n'

const LATITUDE = 33.7001019
const LONGITUDE = 72.9735978
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0021
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  }
]

export default function FullMap() {
  const route = useRoute()
  const styles = useStyle()
  const { dark, colors } = useTheme()
  const navigation = useNavigation()
  const [mapMargin, setMapMargin] = useState(1)
  const latitude = route.params.latitude ?? LATITUDE
  const longitude = route.params.longitude ?? LONGITUDE

  const [region, setRegion] = useState({
    latitude: latitude,
    latitudeDelta: LATITUDE_DELTA,
    longitude: longitude,
    longitudeDelta: LONGITUDE_DELTA
  })
  const backScreen = route.params.currentScreen ?? null

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Map',
      headerRight: null
    })
  }, [navigation])

  useEffect(() => {
    if (backScreen === 'NewAddress') _getLocationAsync()
  }, [backScreen])
  function setMargin() {
    setMapMargin(0)
  }

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
    } else {
      FlashMessage({
        message: i18n.t('LocationPermissionNotGranted')
      })
    }
  }

  function onSave() {
    if (backScreen === NAVIGATION_SCREEN.NewAddress) {
      navigation.navigate(NAVIGATION_SCREEN.NewAddress, {
        regionChange: region
      })
    } else if (backScreen === NAVIGATION_SCREEN.EditAddress) {
      navigation.navigate(NAVIGATION_SCREEN.EditAddress, {
        regionChange: region
      })
    }
  }

  return (
    <WrapperView>
      <View style={styles.flex}>
        <View style={[styles.flex, { backgroundColor: colors.background }]}>
          <MapView
            style={[styles.container, { marginTop: mapMargin }]}
            initialRegion={region}
            // loadingEnabled={true}
            // loadingBackgroundColor={colors.background}
            // loadingIndicatorColor={colors.spinnerColor}
            onRegionChangeComplete={setRegion}
            // showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            customMapStyle={dark ? mapStyle : null}
            showsMyLocationButton
            onMapReady={setMargin}
            showsTraffic={false}
            rotateEnabled={false}
            region={region}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude
              }}>
              <Image
                style={{ width: scale(43), height: scale(43) }}
                source={require('../../assets/images/markerEnatega.png')}
              />
            </Marker>
          </MapView>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={onSave}>
            <TextDefault textColor={colors.white} H4 bold>
              Save
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperView>
  )
}
