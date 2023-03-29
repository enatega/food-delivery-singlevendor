import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import i18n from '../../../i18n'
import TextDefault from '../../components/Text/TextDefault/TextDefault'
import TextLine from '../../components/Text/TextLine/TextLine'
import { NAVIGATION_SCREEN } from '../../utils/constant'
import { scale } from '../../utils/scaling'
import useStyle from './styles'
import { WrapperView } from '../../components'

function SelectVoucher() {
  const styles = useStyle()
  const { colors } = useTheme()
  const navigation = useNavigation()
  const inset = useSafeAreaInsets()
  const [voucherCode, voucherCodeSetter] = useState(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      title: 'My Vouchers'
    })
  }, [navigation])

  function onSelectCoupon(text) {
    navigation.navigate(NAVIGATION_SCREEN.Cart, { CoupanObject: text })
  }

  return (
    <WrapperView>
      <View style={styles.container}>
        <TextLine
          headerName="TYPe voucher code"
          textWidth="50%"
          lineWidth="25%"
        />
        <View style={styles.upperContainer}>
          <View style={{ width: '70%' }}>
            <TextField
              label="Enter your voucher code"
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              maxLength={15}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.errorColor}
              tintColor={colors.fontMainColor}
              labelOffset={{ y1: -5 }}
              labelTextStyle={{ fontSize: scale(12), paddingTop: scale(1) }}
              onChangeText={text => {
                voucherCodeSetter(text)
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => onSelectCoupon(voucherCode)}
            style={styles.buttonContainer}>
            <TextDefault textColor={colors.buttonText} H5 bold uppercase>
              {i18n.t('apply')}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingBottom: inset.bottom,
          backgroundColor: colors.background
        }}
      />
    </WrapperView>
  )
}

export default SelectVoucher
