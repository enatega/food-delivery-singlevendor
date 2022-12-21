/* eslint-disable camelcase */
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split, concat, Observable } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import { getOrders, uploadToken } from '../src/apollo/server'

import { ws_server_url, server_url } from './config/config'
import App from './app'
const GET_ORDERS = gql`
  ${getOrders}
`
const UPLOAD_TOKEN = gql`
  ${uploadToken}
`

const firebaseConfig = {
  apiKey: 'AIzaSyDCnSTWqbN7NWg9oVDzWz5dvhw2dX-RTb0',
  authDomain: 'foodapp-77e88.firebaseapp.com',
  databaseURL: 'https://foodapp-77e88.firebaseio.com',
  projectId: 'foodapp-77e88',
  storageBucket: 'foodapp-77e88.appspot.com',
  messagingSenderId: '678143951107',
  appId: '1:678143951107:web:498eca9a1eca6c0b'
}

const cache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: `${server_url}graphql`
})
const wsLink = new WebSocketLink({
  uri: `${ws_server_url}graphql`,
  options: {
    reconnect: true
  }
})

const request = async operation => {
  const data = localStorage.getItem('user-enatega')
  let token = null
  if (data) {
    token = JSON.parse(data).token
  }
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      console.log(observer)
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink
  // httpLink,
)

const client = new ApolloClient({
  link: concat(ApolloLink.from([terminatingLink, requestLink]), httpLink),
  cache
})

// // Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.usePublicVapidKey(
  'BBFzJyX1yDzhRcnK07MEBYKqI5muEFTwnxPwg94IdPTAbFi1KstIQVeyuvWAo3-5LH_oBsfivWns53iMXEuS6Lg'
)
messaging
  .requestPermission()
  .then(function() {
    messaging
      .getToken()
      .then(function(currentToken) {
        if (currentToken) {
          client
            .mutate({
              mutation: UPLOAD_TOKEN,
              variables: { pushToken: currentToken }
            })
            .then(() => {})
            .catch(() => {})
        } else {
        }
      })
      .catch(function() {})
  })
  .catch(function() {})

messaging.onMessage(function(payload) {
  var notificationTitle = 'New Order on Enatega'
  var notificationOptions = {
    body: payload.data.orderid,
    icon: 'https://www.enatega.com/assets/images/logo.png'
  }
  const nt = new Notification(notificationTitle, notificationOptions)
  nt.onclick = function(event) {
    event.preventDefault() // prevent the browser from focusing the Notification's tab
    window.open('https://enatega.com/dashboard')
    nt.close()
  }
  // console.log('Message received. ', payload);
  client.query({ query: GET_ORDERS, fetchPolicy: 'network-only' })
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
