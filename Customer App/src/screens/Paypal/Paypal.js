import React, { useState, useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview'
import gql from 'graphql-tag'
import { myOrders } from '../../apollo/server'
import getEnvVars from '../../../environment'
import { useApolloClient } from '@apollo/react-hooks'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { WrapperView } from '../../components'

const { SERVER_URL } = getEnvVars()

const MYORDERS = gql`
  ${myOrders}
`

function Paypal() {
  const [loading, loadingSetter] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const client = useApolloClient()
  const [_id] = useState(route.params._id ?? null)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      title: 'Paypal Checkout'
    })
  }, [navigation])

  async function handleResponse(data) {
    if (data.title === 'success') {
      const result = await client.query({
        query: MYORDERS,
        fetchPolicy: 'network-only'
      })
      const order = result.data.orders.find(order => order.order_id === _id)
      navigation.reset({
        routes: [
          { name: 'Menu' },
          {
            name: 'OrderDetail',
            params: { _id: order._id, clearCart: true }
          }
        ]
      })
    } else if (data.title === 'cancel') {
      navigation.goBack()
      // goBack on Payment Screen
    }
  }

  return (
    <WrapperView>
      <WebView
        source={{ uri: `${SERVER_URL}paypal?id=${_id}` }}
        onNavigationStateChange={data => {
          handleResponse(data)
        }}
        onLoad={() => {
          loadingSetter(false)
        }}
      />
      {loading ? (
        <ActivityIndicator
          style={{ position: 'absolute', bottom: '50%', left: '50%' }}
        />
      ) : null}
    </WrapperView>
  )
}

export default Paypal
