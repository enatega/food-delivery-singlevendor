import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native'
import i18n from '../../../i18n'
import { AssignedOrders, NewOrders, TextDefault } from '../../components'
import colors from '../../utilities/colors'
import useStyle from './style'

const BACKGROUND_IMAGE = require('../../../assets/images/ui/BG.png')

export default function Orders() {
  const styles = useStyle()
  const [isNewOrderSelected, setIsNewOrderSelected] = useState(false)

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
  }, [isNewOrderSelected])

  return (
    <View style={[styles.flex, styles.bottom]}>
      <ImageBackground style={styles.imageContainer} source={BACKGROUND_IMAGE}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewOrderSelected(false)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: !isNewOrderSelected
                  ? colors.buttonBackgroundPink
                  : 'transparent'
              }
            ]}>
            <TextDefault bold H5 numberOfLines={1}>
              {i18n.t('myOrders')}
            </TextDefault>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewOrderSelected(true)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: isNewOrderSelected
                  ? colors.buttonBackgroundPink
                  : 'transparent'
              }
            ]}>
            <TextDefault bold H5 numberOfLines={1}>
              {i18n.t('newOrders')}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {!isNewOrderSelected ? <AssignedOrders /> : <NewOrders />}
    </View>
  )
}
