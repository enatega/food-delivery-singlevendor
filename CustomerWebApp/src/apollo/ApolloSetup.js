import { ApolloProvider } from "@apollo/client";
import React from "react";
import setupApollo from "./setup";

function ApolloSetup({ children }) {
  const client = setupApollo();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default React.memo(ApolloSetup);
