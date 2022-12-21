import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import uuid from 'uuid'
import { profile, myOrders, orderStatusChanged } from '../apollo/server'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PROFILE = gql`
  ${profile}
`
const ORDERS = gql`
  ${myOrders}
` // rename this 'orders' when user context is complete
const SUBSCRIPTION_ORDERS = gql`
  ${orderStatusChanged}
` // rename this 'subscriptionOrders' when user context is complete

const UserContext = React.createContext({})

export const UserProvider = props => {
  const client = useApolloClient()
  const [token, setToken] = useState('')
  const [cart, setCart] = useState([]) // use initial state of cart here

  const [
    fetchProfile,
    {
      called: calledProfile,
      loading: loadingProfile,
      error: errorProfile,
      data: dataProfile
    }
  ] = useLazyQuery(PROFILE, {
    fetchPolicy: 'network-only',
    onCompleted,
    onError
  })
  const [
    fetchOrders,
    {
      called: calledOrders,
      loading: loadingOrders,
      error: errorOrders,
      data: dataOrders,
      networkStatus: networkStatusOrders,
      fetchMore: fetchMoreOrders,
      subscribeToMore: subscribeToMoreOrders
    }
  ] = useLazyQuery(ORDERS, {
    fetchPolicy: 'network-only',
    onCompleted,
    onError
  })

  useEffect(() => {
    let isSubscribed = true
    ;(async() => {
      const token = await AsyncStorage.getItem('token')
      isSubscribed && setToken(token)
    })()
    return () => {
      isSubscribed = false
    }
  }, [])

  useEffect(() => {
    if (!token) return
    let isSubscribed = true
    ;(async() => {
      isSubscribed && (await fetchProfile())
      isSubscribed && (await fetchOrders())
    })()
    return () => {
      isSubscribed = false
    }
  }, [token])

  useEffect(() => {
    if (!dataProfile) return
    subscribeOrders()
  }, [dataProfile])

  useEffect(() => {
    let isSubscribed = true
    ;(async() => {
      const cart = await AsyncStorage.getItem('cartItems')
      isSubscribed && setCart(cart ? JSON.parse(cart) : [])
    })()
    return () => {
      isSubscribed = false
    }
  }, [])

  function onCompleted({ profile, orders }) {}
  function onError(error) {
    console.log('error context', error)
  }

  const setTokenAsync = async token => {
    await AsyncStorage.setItem('token', token)
    setToken(token)
  }

  const logout = async() => {
    try {
      await AsyncStorage.removeItem('token')
      setToken(null)
      await client.resetStore()
    } catch (error) {
      console.log('error on logout', error)
    }
  }

  const subscribeOrders = () => {
    try {
      const unsubscribeOrders = subscribeToMoreOrders({
        document: SUBSCRIPTION_ORDERS,
        variables: { userId: dataProfile.profile._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const { _id } = subscriptionData.data.orderStatusChanged.order
          if (subscriptionData.data.orderStatusChanged.origin === 'new') {
            if (prev.orders.findIndex(o => o._id === _id) > -1) return prev
            return {
              orders: [
                subscriptionData.data.orderStatusChanged.order,
                ...prev.orders
              ]
            }
          } else {
            const { orders } = prev
            const orderIndex = orders.findIndex(o => o._id === _id)
            if (orderIndex > -1) {
              orders[orderIndex] =
                subscriptionData.data.orderStatusChanged.order
            }
            return {
              orders: [...orders]
            }
          }
        }
      })
      client.onResetStore(unsubscribeOrders)
    } catch (error) {
      console.log('error subscribing order', error.message)
    }
  }

  const fetchMoreOrdersFunc = () => {
    if (networkStatusOrders === 7) {
      fetchMoreOrders({
        variables: { offset: dataOrders.orders.length + 1 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // Don't do anything if there weren't any new items
          if (!fetchMoreResult || fetchMoreResult.orders.length === 0) {
            return previousResult
          }
          // setOrders(previousResult.orders.concat(fetchMoreResult.orders))
          return {
            // Append the new feed results to the old one
            orders: previousResult.orders.concat(fetchMoreResult.orders)
          }
        }
      })
    }
  }

  const clearCart = async() => {
    setCart([])
    await AsyncStorage.setItem('cartItems', JSON.stringify([]))
  }

  const addQuantity = async(key, quantity = 1) => {
    const cartIndex = cart.findIndex(c => c.key === key)
    cart[cartIndex].quantity += quantity
    setCart([...cart])
    await AsyncStorage.setItem('cartItems', JSON.stringify([...cart]))
  }

  const removeQuantity = async key => {
    const cartIndex = cart.findIndex(c => c.key === key)
    cart[cartIndex].quantity -= 1
    setCart([...cart.filter(c => c.quantity > 0)])
    await AsyncStorage.setItem(
      'cartItems',
      JSON.stringify(cart.filter(c => c.quantity > 0))
    )
  }

  const addCartItem = async(_id, variation, quantity = 1, addons = []) => {
    const index = cart.findIndex(f => f._id === _id)
    if (index < 0) {
      cart.push({
        key: uuid.v4(),
        _id,
        quantity: quantity,
        variation: {
          _id: variation
        },
        addons
      })
    } else {
      cart[index].quantity += 1
    }
    await AsyncStorage.setItem('cartItems', JSON.stringify([...cart]))
    setCart([...cart])
  }

  const updateCart = async cart => {
    setCart(cart)
    await AsyncStorage.setItem('cartItems', JSON.stringify(cart))
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!token && dataProfile && !!dataProfile.profile,
        loadingProfile: loadingProfile && calledProfile,
        errorProfile,
        profile:
          dataProfile && dataProfile.profile ? dataProfile.profile : null,
        setTokenAsync,
        logout,
        loadingOrders: loadingOrders && calledOrders,
        errorOrders,
        orders: dataOrders && dataOrders.orders ? dataOrders.orders : [],
        fetchOrders,
        fetchMoreOrdersFunc,
        networkStatusOrders,
        cart,
        cartCount: cart.length,
        clearCart,
        updateCart,
        addQuantity,
        removeQuantity,
        addCartItem
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node
}
export const UserConsumer = UserContext.Consumer
export default UserContext
