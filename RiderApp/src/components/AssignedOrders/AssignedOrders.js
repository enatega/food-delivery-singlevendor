import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import Spinner from '../Spinner/Spinner'
import Order from '../Order/Order'
import ConfigurationContext from '../../context/configuration'
import UserContext from '../../context/user'
import TextError from '../Text/TextError/TextError'
import { useNavigation } from '@react-navigation/native'
import { verticalScale } from '../../utilities/scaling'

export default function Orders() {
  const navigation = useNavigation()
  const configuration = useContext(ConfigurationContext)
  const {
    loadingAssigned,
    errorAssigned,
    assignedOrders,
    refetchAssigned,
    networkStatusAssigned
  } = useContext(UserContext)

  if (loadingAssigned) return <Spinner />
  if (errorAssigned) return <TextError text="Something is worng" />

  function emptyView() {
    return <TextError text="No Orders Assigned yet!" />
  }

  return (
    <FlatList
      keyExtractor={item => item._id}
      data={assignedOrders.length > 0 ? assignedOrders.slice().reverse() : []}
      refreshing={networkStatusAssigned === 4}
      onRefresh={() => refetchAssigned()}
      initialNumToRender={3}
      ListEmptyComponent={emptyView}
      style={{ marginTop: verticalScale(-80) }}
      renderItem={({ item }) => (
        <Order
          key={item._id}
          orderId={item.order_id}
          orderStatus={item.order_status}
          orderAmount={`${configuration.currency_symbol}${item.order_amount}`}
          orderDatetime={item.createdAt}
          paymentMethod={item.payment_method}
          onPress={() => {
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
