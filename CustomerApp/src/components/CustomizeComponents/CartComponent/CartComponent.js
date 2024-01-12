import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ICONS_NAME } from '../../../utils/constant'
import { scale } from '../../../utils/scaling'
import { CustomIcon } from '../../CustomIcon'
import { FlashMessage } from '../../FlashMessage/FlashMessage'
import TextDefault from '../../Text/TextDefault/TextDefault'
import useStyle from './styles'
import i18n from '../../../../i18n'

function CartComponent(props) {
  const { colors } = useTheme()
  const styles = useStyle()
  const [quantity, setQuantity] = useState(1)

  function onAdd() {
    if (props.stock > quantity) setQuantity(quantity + 1)
    else {
      FlashMessage({
        message: i18n.t('noMoreItems')
      })
    }
  }
  function onRemove() {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onRemove}
          style={styles.icon}>
          <CustomIcon
            name={ICONS_NAME.Minus}
            size={scale(18)}
            color={colors.placeHolderColor}
          />
        </TouchableOpacity>
        <TextDefault H5 bold center>
          {quantity}
        </TextDefault>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onAdd}
          style={styles.icon}>
          <CustomIcon
            name={ICONS_NAME.Plus}
            size={scale(18)}
            color={colors.placeHolderColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.onPress.bind(this, quantity)}
          style={
            !props.disabled
              ? styles.btnContainer
              : {
                ...styles.btnContainer,
                backgroundColor: colors.buttonBackgroundBlue
              }
          }>
          <TextDefault textColor={colors.buttonText} H5 bold center>
            Add To Cart
          </TextDefault>
        </TouchableOpacity>
      </View>
    </View>
  )
}
CartComponent.propTypes = {
  stock: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
}

export default CartComponent
