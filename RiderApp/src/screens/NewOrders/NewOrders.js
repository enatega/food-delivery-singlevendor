import React, { useContext } from 'react'
import { View, FlatList } from 'react-native'
import Order from '../../components/Order/Order'
import ConfigurationContext from '../../context/configuration'
import UserContext from '../../context/user'
import styles from './style'
import { TextError, Spinner } from '../../components'
import { useNavigation } from '@react-navigation/native'
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
    <View style={styles.flex}>
      <View style={styles.flex}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={item => item._id}
          data={
            unAssignedOrders.length > 0
              ? unAssignedOrders.slice().reverse()
              : []
          }
          refreshing={networkStatusUnAssigned === 4}
          onRefresh={refetchUnAssigned}
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
                navigation.navigate('OrderDetail', { id: item._id })
              }}
            />
          )}
        />
      </View>
    </View>
  )
}
