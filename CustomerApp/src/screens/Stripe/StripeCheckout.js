import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { myOrders } from '../../apollo/server'
import gql from 'graphql-tag'
import { stripeCurrencies } from '../../utils/currencies'
import getEnvVars from '../../../environment'
import { useApolloClient } from '@apollo/react-hooks'
import { useNavigation, useRoute } from '@react-navigation/native'
import { WrapperView } from '../../components'

const { SERVER_URL, STRIPE_PUBLIC_KEY, STRIPE_IMAGE_URL, STRIPE_STORE_NAME } =
  getEnvVars()
const MYORDERS = gql`
  ${myOrders}
`

function StripeCheckout() {
  const [loading, loadingSetter] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const client = useApolloClient()
  const { _id, currency, email: prepopulatedEmail } = route.params
  const multiplier = stripeCurrencies.find(
    ({ currency: curr }) => curr === currency
  ).multiplier
  const amount = route.params.amount * multiplier
  const description = 'Food delivery' // find alternative to this
  const allowRememberMe = false

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      title: 'Stripe Checkout'
    })
  }, [navigation])

  function onClose(flag) {
    // showMessage here
    navigation.goBack()
  }

  async function onPaymentSuccess() {
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
  }

  return (
    <WrapperView>
      <WebView
        javaScriptEnabled={true}
        scrollEnabled={false}
        bounces={false}
        onLoad={() => {
          loadingSetter(false)
        }}
        source={{
          html: `<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></head><script src="https://checkout.stripe.com/checkout.js"></script>
<script>
var paymentStatus=false;
var handler = StripeCheckout.configure({
  key: '${STRIPE_PUBLIC_KEY}',
  image: '${STRIPE_IMAGE_URL}',
  locale: 'auto',
  token: function(token) {
    paymentStatus=true
    fetch('${SERVER_URL}stripe/charge?id=${_id}', {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      
      body: JSON.stringify(token)
    })
      .then(response => response.json())
      .then(result => {
        if(result.redirect)
          window.location='${SERVER_URL}'+result.redirect
      })
      .catch(error => { alert(error) });
  },
});

window.onload = function() {
  handler.open({
    image: '${STRIPE_IMAGE_URL}',
    name: '${STRIPE_STORE_NAME}',
    description: '${description}',
    amount: ${amount},
    currency: '${currency}',
    allowRememberMe: ${allowRememberMe},
    email: '${prepopulatedEmail}',
    closed: function() {
      if(!paymentStatus)
      window.location='${SERVER_URL}stripe/cancel'
    }
  });
};
</script>`,
          baseUrl: Platform.OS === 'android' ? '' : `${SERVER_URL}`
        }}
        scalesPageToFit={Platform.OS === 'android'}
        onNavigationStateChange={data => {
          if (data.title === 'cancel') onClose(true)
          if (data.title === 'failed') onClose(false)
          if (data.title === 'success') onPaymentSuccess()
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

export default StripeCheckout
