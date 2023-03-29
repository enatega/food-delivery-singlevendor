import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import ConfigurationContext from '../../context/Configuration'
import { COLORS } from '../../Theme/Colors'
import { alignment } from '../../utils/alignment'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../../utils/constant'
import { scale } from '../../utils/scaling'
import { CustomIcon } from '../CustomIcon/index'
import EnategaImage from '../EnategaImage/EnategaImage'
import TextDefault from '../Text/TextDefault/TextDefault'
import TextError from '../Text/TextError/TextError'
import TextLine from '../Text/TextLine/TextLine'
import useStyle from './styles'

export const orderStatuses = [
  {
    key: 'PENDING',
    status: 1,
    icon: ICONS_NAME.Clock,
    color: COLORS.primary
  },
  {
    key: 'ACCEPTED',
    status: 2,
    icon: ICONS_NAME.Checked,
    color: COLORS.blueColor
  },
  {
    key: 'PICKED',
    status: 3,
    icon: ICONS_NAME.Checked,
    color: COLORS.blueColor
  },
  {
    key: 'DELIVERED',
    status: 4,
    icon: ICONS_NAME.Checked,
    color: COLORS.blueColor
  },
  {
    key: 'COMPLETED',
    status: 5,
    icon: ICONS_NAME.Checked,
    color: COLORS.blueColor
  }
]

const ActiveOrders = ({
  navigation,
  loading,
  error,
  activeOrders,
  pastOrders
}) => {
  const styles = useStyle()
  const { colors } = useTheme()
  const configuration = useContext(ConfigurationContext)
  if (loading) {
    return <TextDefault small> Loading...</TextDefault>
  }
  if (error) return <TextError text={error.message} />
  if (!activeOrders || (activeOrders && !activeOrders.length)) {
    if (!pastOrders || (pastOrders && !pastOrders.length)) {
      return <TextDefault> </TextDefault>
    }
    return <TextLine headerName="Old Order" textWidth="34%" lineWidth="28%" />
  }

  const checkStatus = status => {
    const obj = orderStatuses.filter(x => {
      return x.key === status
    })
    return obj[0]
  }

  return (
    <React.Fragment>
      <TextLine headerName="Active Order" textWidth="40%" lineWidth="26%" />
      {activeOrders.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index.toString()}
          onPress={() =>
            navigation.navigate(NAVIGATION_SCREEN.OrderDetail, {
              _id: item._id
            })
          }>
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <EnategaImage
                imgStyle={styles.imgResponsive}
                imgSource={{ uri: item?.items[0]?.food?.img_url }}
                spinnerProps={{ style: styles.loadingView }}
              />
            </View>
            <View style={styles.infoContainer}>
              <TextDefault H5 bolder style={alignment.MBxSmall}>
                {'ID: '}
                {item.order_id}
              </TextDefault>
              <TextDefault line={3} textColor={colors.tagColor} H5 bold>
                {configuration.currency_symbol}
                {item.order_amount}
              </TextDefault>
            </View>
            <View style={styles.Vline} />
            <View style={styles.rightContainer}>
              <CustomIcon
                name={checkStatus(item.order_status).icon}
                size={scale(28)}
                color={checkStatus(item.order_status).color}
              />
              <TextDefault
                textColor={checkStatus(item.order_status).color}
                style={alignment.MTxSmall}
                bold
                center>
                {item.order_status}
              </TextDefault>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TextLine headerName="Old Orders" textWidth="34%" lineWidth="26%" />
    </React.Fragment>
  )
}

ActiveOrders.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  activeOrders: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.object,
  pastOrders: PropTypes.arrayOf(PropTypes.object)
}

export default ActiveOrders
