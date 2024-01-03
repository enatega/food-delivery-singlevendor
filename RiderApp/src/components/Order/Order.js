import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { scale } from '../../utilities/scaling'
import colors from '../../utilities/colors'
import styles from './style'
import i18n from '../../../i18n'
import TextDefault from '../Text/TextDefault/TextDefault'
import { alignment } from '../../utilities/alignment'
import { AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'

export const orderStatuses = [
  {
    key: 'PENDING',
    color: '#518ef8'
  },
  {
    key: 'ACCEPTED',
    color: '#518ef8'
  },
  {
    key: 'PICKED',
    color: '#febb2c'
  },
  {
    key: 'DELIVERED',
    color: '#28b446'
  },
  {
    key: 'COMPLETED',
    color: '#f14336'
  }
]

function Order(props) {
  // const cardHeight = props.height
  //   ? props.height
  //   : PixelRatio.getFontScale() * verticalScale(150)

  const checkStatus = status => {
    const obj = orderStatuses.filter(x => {
      return x.key === status
    })
    return obj[0]
  }

  const statusColor = checkStatus(props.orderStatus).color

  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <View style={[styles.card_container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View style={{ width: '50%' }}>
            <TextDefault
              numberOfLines={2}
              bold
              textColor={colors.placeHolderColor}>
              {i18n.t('YourOrderID')}
            </TextDefault>
            <TextDefault H4 bolder>
              {props.orderId}
            </TextDefault>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={[
                styles.cardStatusContainer,
                { borderColor: statusColor, borderWidth: 1 }
              ]}>
              <TextDefault
                textColor={statusColor}
                bold
                uppercase
                style={{ ...alignment.PLxSmall, ...alignment.PRxSmall }}>
                {i18n.t(props.orderStatus)}
              </TextDefault>
            </View>
            <View style={{ paddingLeft: '5%' }}>
              <AntDesign
                name="arrowright"
                size={scale(20)}
                color={colors.fontMainColor}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%'
          }}>
          <View>
            <TextDefault
              style={alignment.MTmedium}
              textColor={colors.placeHolderColor}
              bold>
              {i18n.t('totalOrderAmount')}
            </TextDefault>
            <TextDefault
              textColor={colors.placeHolderColor}
              bold
              style={{ ...alignment.MTxSmall }}>
              {i18n.t('paymentMethod')}
            </TextDefault>
            <TextDefault
              textColor={colors.placeHolderColor}
              bold
              style={{ ...alignment.MTxSmall }}>
              {i18n.t('deliveryTime')}
            </TextDefault>
          </View>
          <View>
            <TextDefault
              style={alignment.MTmedium}
              textColor={colors.fontMainColor}
              bolder>
              {props.orderAmount}
            </TextDefault>
            <TextDefault
              textColor={colors.fontMainColor}
              bolder
              style={{ ...alignment.MTxSmall }}>
              {props.paymentMethod}
            </TextDefault>
            <TextDefault
              textColor={colors.fontMainColor}
              bolder
              style={{ ...alignment.MTxSmall }}>
              {new Date(props.orderDatetime).toLocaleDateString()}{' '}
              {new Date(props.orderDatetime).toLocaleTimeString()}{' '}
            </TextDefault>
          </View>
        </View>
        {/* <View style={[styles.card_container__left]}>
          <View style={[styles.left_toptextLine]}>
          <TextDefault center H5 bold textColor={colors.placeHolderColor}>
             Your {i18n.t('orderId')}
            </TextDefault>
            <TextDefault H3 bolder>
              {props.orderId}
            </TextDefault>
          </View> */}
        {/* <TextDefault style={alignment.MTmedium} textColor={colors.placeHolderColor} bold>
            {i18n.t('totalOrderAmount')} - {props.orderAmount}
          </TextDefault>
          <TextDefault
            textColor={colors.placeHolderColor}
            bold
            style={{ ...alignment.MTxSmall }}>
            {new Date(props.orderDatetime).toDateString()}{' '}
            {new Date(props.orderDatetime).toTimeString()}
          </TextDefault>
          <TextDefault
            textColor={colors.placeHolderColor}
            bold
            style={{ ...alignment.MTxSmall }}>
            Payment method: {props.paymentMethod}
          </TextDefault> */}
        {/* </View> */}
        {/* <View style={styles.card_container__right}> */}
        {/* <View style={styles.cardSubContainerRight}>
            <View
              style={[
                styles.cardStatusContainer,
                { borderColor: statusColor, borderWidth:1 }
              ]}>
              <TextDefault
                textColor={statusColor}
                bold
                uppercase
                style={{ ...alignment.PLxSmall, ...alignment.PRxSmall }}>
                {props.orderStatus}
              </TextDefault>
            </View>
            <View style={styles.cardRightArrow}>
              <AntDesign
                name="arrowright"
                size={scale(25)}
                color={colors.fontMainColor}
              />
            </View>
          </View> */}
        {/* </View> */}
      </View>
    </TouchableOpacity>
  )
}
Order.propTypes = {
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  orderStatus: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  orderId: PropTypes.string.isRequired,
  orderAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orderDatetime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  paymentMethod: PropTypes.string
}
export default Order
