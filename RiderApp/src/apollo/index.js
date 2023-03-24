import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split, concat, Observable } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { withClientState } from 'apollo-link-state'

import getEnvVars from "../../environment";
const { GRAPHQL_URL, WS_GRAPHQL_URL } = getEnvVars();

export let clientRef = null;

function setupApolloClient() {
  const cache = new InMemoryCache();

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
  });
  const wsLink = new WebSocketLink({
    uri: WS_GRAPHQL_URL,
    options: {
      reconnect: true,
    },
  });

  // const stateLink = withClientState({
  //   cache
  // })

  const request = async (operation) => {
    const token = await AsyncStorage.getItem("rider-token");

    operation.setContext({
      // get the authentication token from local storage if it exists
      // return the headers to the context so httpLink can read them
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        // console.log(observer)
        let handle;
        Promise.resolve(operation)
          .then((oper) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink
    // httpLink,
  );

  const client = new ApolloClient({
    // link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
    link: concat(ApolloLink.from([terminatingLink, requestLink]), httpLink),
    cache,
    resolvers: {},
  });
  clientRef = client;
  return client;
}
export default setupApolloClient;
