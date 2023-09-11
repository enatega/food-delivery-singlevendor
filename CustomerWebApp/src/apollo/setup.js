import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "../configuration/configurataion";

const httpLink = new HttpLink({ uri: `${SERVER_URL}graphql` });

const request = async (operation) => {
  const data = localStorage.getItem("token");

  let token = null;
  if (data) {
    token = data;
  }
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
};

const requestLink = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  await request(operation);

  return forward(operation);
});

const setupApollo = () => {
  const client = new ApolloClient({
    link: from([requestLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
  return client;
};

export default setupApollo;
