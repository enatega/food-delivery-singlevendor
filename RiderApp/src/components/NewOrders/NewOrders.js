import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import Spinner from '../Spinner/Spinner'
import Order from '../Order/Order'
import ConfigurationContext from '../../context/configuration'
import UserContext from '../../context/user'
import TextError from '../Text/TextError/TextError'
import { useNavigation } from '@react-navigation/native'
import { verticalScale } from '../../utilities/scaling'
import i18n from '../../../i18n'

export default function Orders() {
  const navigation = useNavigation()
  const configuration = useContext(ConfigurationContext)
  const {
    loadingUnAssigned,
    errorUnAssigned,
    unAssignedOrders,
    refetchUnAssigned,
    networkStatusUnAssigned
  } = useContext(UserContext)

  function emptyView() {
    return <TextError text={i18n.t('NoNewOrder')} />
  }

  if (loadingUnAssigned) return <Spinner />
  if (errorUnAssigned) return <TextError text={i18n.t('Somethingisworng')} />

  return (
    <FlatList
      keyExtractor={item => item._id}
      data={
        unAssignedOrders.length > 0 ? unAssignedOrders.slice().reverse() : []
      }
      style={{ marginTop: verticalScale(-80) }}
      refreshing={networkStatusUnAssigned === 4}
      onRefresh={refetchUnAssigned}
      initialNumToRender={3}
      ListEmptyComponent={emptyView}
      renderItem={({ item }) => (
        <Order
          key={item._id}
          orderId={item.order_id}
          orderStatus={item.order_status}
          orderAmount={`${configuration.currency_symbol}${item.order_amount}`}
          orderDatetime={item.createdAt}
          paymentMethod={item.payment_method}
          onPress={() => {
            console.log('item', item)
            navigation.navigate('OrderDetail', {
              id: item._id,
              orderId: item.order_id
            })
          }}
        />
      )}
    />
  )
}
