/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/react-hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'
import gql from 'graphql-tag'
import React, { useEffect, useRef, useState } from 'react'
import { updateLocation } from '../apollo/mutations'
import {
  assignedOrders,
  profile,
  subscriptionAssignRider,
  subscriptionUnAssignedOrder,
  unassignedOrders
} from '../apollo/queries'

const PROFILE = gql`
  ${profile}
`
const ASSIGNED_ORDERS = gql`
  ${assignedOrders}
`
const SUBSCRIPTION_RIDER_ORDER = gql`
  ${subscriptionAssignRider}
`
const UNASSIGNED_ORDERS = gql`
  ${unassignedOrders}
`
const SUBSCRIPTION_UNASSIGNED_ORDER = gql`
  ${subscriptionUnAssignedOrder}
`

const UPDATE_LOCATION = gql`
  ${updateLocation}
`

const UserContext = React.createContext({})

export const UserProvider = props => {
  const [token, setToken] = useState()
  const [profile, setProfile] = useState({ isLoggedIn: false })
  const [assignedOrders, setAssignedOrders] = useState([])
  const [unAssignedOrders, setUnAssignedOrders] = useState([])
  const locationListener = useRef()
  const {
    client,
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile
  } = useQuery(PROFILE, {
    fetchPolicy: 'network-only',
    onCompleted,
    onError
  })
  const {
    loading: loadingAssigned,
    error: errorAssigned,
    networkStatus: networkStatusAssigned,
    subscribeToMore: subscribeToMoreAssigned,
    refetch: refetchAssigned,
    data: dataAssigned
  } = useQuery(ASSIGNED_ORDERS, {
    onCompleted,
    onError,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  })
  const {
    loading: loadingUnAssigned,
    error: errorUnAssigned,
    networkStatus: networkStatusUnAssigned,
    subscribeToMore: subscribeToMoreUnAssigned,
    refetch: refetchUnAssigned,
    data: dataUnassigned
  } = useQuery(UNASSIGNED_ORDERS, {
    onCompleted,
    onError,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    return () => {
      locationListener.current && locationListener.current.remove()
    }
  }, [])

  // useEffect(() => {
  //   let isSubscribed = true;
  //     (async () => {
  //       const token = await AsyncStorage.getItem('rider-token')
  //       isSubscribed && setToken(token)
  //     })()
  //   return () => {
  //     isSubscribed = false
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!token) return
  //   let isSubscribed = true
  //     ; (async () => {
  //       isSubscribed && fetchProfile()
  //       isSubscribed && fetchAssigned()
  //       isSubscribed && fetchUnAssigned()
  //       isSubscribed && trackRiderLocation()
  //     })()
  //   return () => {
  //     isSubscribed = false
  //   }
  // }, [token])
  let unsubscribeAssignedOrders = null
  let unsubscribeUnAssignedOrders = null
  useEffect(() => {
    if (!dataProfile) return
    unsubscribeAssignedOrders = subscribeAssignedOrders()
    unsubscribeUnAssignedOrders = subscribeUnAssignedOrders()
    trackRiderLocation()

    return () => {
      unsubscribeAssignedOrders && unsubscribeAssignedOrders()
      unsubscribeUnAssignedOrders && unsubscribeUnAssignedOrders()
    }
  }, [dataProfile])

  function onCompleted({ rider, assignedOrders, unassignedOrders }) {
    // if (rider) {
    //   setProfile({ ...rider, isLoggedIn: true })
    // } else if (assignedOrders) {
    //   setAssignedOrders(assignedOrders)
    // } else if (unassignedOrders) {
    //   setUnAssignedOrders(unassignedOrders)
    // }
    // if (dataProfile && dataUnassigned && dataAssigned) {
    //   getNotificationData()
    // }
  }

  function onError(error) {
    console.log('error on fetching context', error)
  }

  const trackRiderLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      if (locationListener.current) locationListener.current.remove()
      locationListener.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 60000,
          distanceInterval: 20
        },
        async ({ coords: { latitude, longitude }, error }) => {
          try {
            await client.mutate({
              mutation: UPDATE_LOCATION,
              variables: {
                latitude: latitude.toString(),
                longitude: longitude.toString()
              }
            })
          } catch (error) {
            console.log('error', JSON.stringify(error))
          }
        }
      )
    }
  }

  const subscribeAssignedOrders = () => {
    try {
      return subscribeToMoreAssigned({
        document: SUBSCRIPTION_RIDER_ORDER,
        variables: { riderId: dataProfile.rider._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          if (subscriptionData.data.subscriptionAssignRider.origin === 'new') {
            setAssignedOrders([
              subscriptionData.data.subscriptionAssignRider.order,
              ...prev.assignedOrders
            ])
            return {
              assignedOrders: [
                subscriptionData.data.subscriptionAssignRider.order,
                ...prev.assignedOrders
              ]
            }
          } else {
            const { assignedOrders } = prev
            const {
              orderStatus,
              _id
            } = subscriptionData.data.subscriptionAssignRider.order
            const orderIndex = assignedOrders.findIndex(o => o._id === _id)
            if (orderIndex > -1) {
              if (orderStatus === 'DELIVERED' || orderStatus === 'CANCELLED') {
                assignedOrders.splice(orderIndex, 1)
              } else {
                assignedOrders[orderIndex].orderStatus = orderStatus
              }
            }
            setAssignedOrders([...assignedOrders])
            return {
              assignedOrders: [...assignedOrders]
            }
          }
        }
      })
    } catch (error) {
      console.log('error subscribe assigned orders', error)
    }
  }

  const subscribeUnAssignedOrders = () => {
    try {
      return subscribeToMoreUnAssigned({
        document: SUBSCRIPTION_UNASSIGNED_ORDER,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          if (subscriptionData.data.unassignedOrder.origin === 'new') {
            setUnAssignedOrders([
              subscriptionData.data.unassignedOrder.order,
              ...prev.unassignedOrders
            ])
            return {
              unassignedOrders: [
                subscriptionData.data.unassignedOrder.order,
                ...prev.unassignedOrders
              ]
            }
          } else {
            const { _id } = subscriptionData.data.unassignedOrder.order
            const { unassignedOrders } = prev
            const orderIndex = unassignedOrders.findIndex(o => o._id === _id)
            if (orderIndex > -1) {
              unassignedOrders.splice(orderIndex, 1)
            }
            setUnAssignedOrders([...unassignedOrders])
            return {
              unassignedOrders: [...unassignedOrders]
            }
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setTokenAsync = async token => {
    await AsyncStorage.setItem('rider-token', token)
    setToken(token)
  }

  const logout = async () => {
    try {
      // await Location.stopLocationUpdatesAsync('RIDER_LOCATION')
      await AsyncStorage.removeItem('rider-token')
      setToken(null)
      setProfile({ isLoggedIn: false })
      setAssignedOrders([])
      setUnAssignedOrders([])
    } catch (error) {
      console.log('error on logout', error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        loadingProfile: loadingProfile,
        errorProfile,
        profile: loadingProfile || errorProfile ? null : dataProfile.rider,
        logout,
        setTokenAsync,
        loadingAssigned,
        errorAssigned,
        assignedOrders:
          loadingAssigned || errorAssigned ? [] : dataAssigned.assignedOrders,
        refetchAssigned,
        networkStatusAssigned,
        loadingUnAssigned,
        errorUnAssigned,
        unAssignedOrders:
          loadingUnAssigned || errorUnAssigned
            ? []
            : dataUnassigned.unassignedOrders,
        refetchUnAssigned,
        networkStatusUnAssigned
      }}>
      {props.children}
    </UserContext.Provider>
  )
}
export const UserConsumer = UserContext.Consumer
export default UserContext
