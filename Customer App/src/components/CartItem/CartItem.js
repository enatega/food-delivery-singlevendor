import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import ConfigurationContext from '../../context/Configuration'
import { alignment } from '../../utils/alignment'
import { ICONS_NAME } from '../../utils/constant'
import { scale } from '../../utils/scaling'
import { CustomIcon } from '../CustomIcon'
import EnategaImage from '../EnategaImage/EnategaImage'
import TextDefault from '../Text/TextDefault/TextDefault'
import useStyle from './styles'

const cartItem = props => {
  const styles = useStyle()
  const { colors } = useTheme()
  const configuration = useContext(ConfigurationContext)

  return (
    <View style={styles.itemContainer}>
      <View style={{ width: '25%' }}>
        <EnategaImage
          imgStyle={styles.imgResponsive}
          imgSource={{ uri: props.image }}
          spinnerProps={{ style: styles.loadingView }}
        />
      </View>
      <View style={styles.textContainer}>
        <TextDefault numberOfLines={2} style={alignment.MBxSmall} medium H5>
          {props.dealName}
        </TextDefault>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <View style={{ flexGrow: 1 }}>
            <TextDefault
              textColor={colors.tagColor}
              H4
              bolder
              style={alignment.MRxSmall}>
              {configuration.currency_symbol}
              {parseFloat(props.dealPrice).toFixed(2)}
            </TextDefault>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.actionContainerBtns}
              onPress={props.removeQuantity}>
              <CustomIcon
                name={ICONS_NAME.Minus}
                size={scale(14)}
                color={colors.placeHolderColor}
              />
            </TouchableOpacity>
            <View style={styles.actionContainerView}>
              <TextDefault style={[alignment.PLsmall, alignment.PRsmall]}>
                {props.quantity}
              </TextDefault>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.actionContainerBtns, styles.tagbtn]}
              onPress={props.addQuantity}>
              <CustomIcon
                name={ICONS_NAME.Plus}
                size={scale(14)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
cartItem.propTypes = {
  removeQuantity: PropTypes.func,
  quantity: PropTypes.number,
  addQuantity: PropTypes.func,
  dealName: PropTypes.string,
  dealPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string
}
export default cartItem
