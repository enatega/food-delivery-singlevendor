/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import React from "react";
import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import { myOrders, orderStatusChanged, profile } from "../apollo/graphQL";
import { has } from "lodash";

const PROFILE = gql`
  ${profile}
`;

const ORDERS = gql`
  ${myOrders}
`;

const SUBSCRIPTION_ORDERS = gql`
  ${orderStatusChanged}
`;

const UserContext = createContext({
  profile: null,
  networkStatusOrders: 0,
  orders: [],
  errorOrders: "",
  loadingProfile: false,
  loadingOrders: false,
  isLoggedIn: false,
  authToken: "",
  fetchMoreOrdersFunc: () => null,
  setTokenAsync: () => null,
  fetchOrders: () => null,
  logout: () => null,
});

function UserProvider({ children }) {
  const client = useApolloClient();
  const [authToken, setAuthToken] = useState(null);

  const [fetchProfile, { loading: loadingProfile, error: errorProfile, data: dataProfile }] = useLazyQuery(PROFILE, {
    fetchPolicy: "network-only",
    onCompleted,
    onError,
  });

  const [
    fetchOrders,
    {
      called: calledOrders,
      loading: loadingOrders,
      error: errorOrders,
      data: dataOrders,
      networkStatus: networkStatusOrders,
      fetchMore: fetchMoreOrders,
      subscribeToMore: subscribeToMoreOrders,
    },
  ] = useLazyQuery(ORDERS, {
    fetchPolicy: "network-only",
    onCompleted,
    onError,
  });

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      const token = localStorage.getItem("token");
      isSubscribed && setAuthToken(token);
    })();

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (!authToken) return;
    let isSubscribed = true;
    (async () => {
      isSubscribed && (await fetchProfile());
      isSubscribed && (await fetchOrders());
    })();
    return () => {
      isSubscribed = false;
    };
  }, [authToken]);

  useEffect(() => {
    if (!dataProfile) return;
    subscribeOrders();
  }, [dataProfile]);

  function onCompleted({ profile, orders }) {}
  function onError(error) {
    console.log("error context", error);
  }

  const fetchMoreOrdersFunc = () => {
    if (networkStatusOrders === 7) {
      fetchMoreOrders({
        variables: { offset: dataOrders.orders.length + 1 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // Don't do anything if there weren't any new items
          if (!fetchMoreResult || fetchMoreResult.orders.length === 0) {
            return previousResult;
          }
          // setOrders(previousResult.orders.concat(fetchMoreResult.orders))
          return {
            // Append the new feed results to the old one
            orders: previousResult.orders.concat(fetchMoreResult.orders),
          };
        },
      });
    }
  };

  const subscribeOrders = () => {
    try {
      const unsubscribeOrders = subscribeToMoreOrders({
        document: SUBSCRIPTION_ORDERS,
        variables: { userId: dataProfile.profile._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { _id } = subscriptionData.data.orderStatusChanged.order;
          if (subscriptionData.data.orderStatusChanged.origin === "new") {
            if (prev.orders.findIndex((o) => o._id === _id) > -1) return prev;
            return {
              orders: [subscriptionData.data.orderStatusChanged.order, ...prev.orders],
            };
          } else {
            const { orders } = prev;
            const orderIndex = orders.findIndex((o) => o._id === _id);
            if (orderIndex > -1) {
              orders[orderIndex] = subscriptionData.data.orderStatusChanged.order;
            }
            return {
              orders: [...orders],
            };
          }
        },
      });
      client.onResetStore(unsubscribeOrders);
    } catch (error) {
      console.log("error subscribing order", error.message);
    }
  };

  const setTokenAsync = async (tokenReq) => {
    localStorage.setItem("token", tokenReq);
    setAuthToken(tokenReq);
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setAuthToken(null);
      await client.resetStore();
    } catch (error) {
      console.log("error on logout", error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: Boolean(authToken) && has(dataProfile, "profile"),
        loadingProfile: loadingProfile,
        errorProfile,
        profile: dataProfile?.profile ?? null,
        loadingOrders: loadingOrders && calledOrders,
        errorOrders,
        orders: dataOrders?.orders ?? [],
        fetchMoreOrdersFunc,
        networkStatusOrders,
        fetchOrders,
        authToken,
        setTokenAsync,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default React.memo(UserProvider);
export { UserContext };
