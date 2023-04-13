/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/
import Constants from "expo-constants";

const ENV = {
  development: {
    // GRAPHQL_URL: 'http://192.168.100.90:8000/graphql',
    // WS_GRAPHQL_URL: 'ws://192.168.100.90:8000/graphql'
    GRAPHQL_URL: "https://enatega-singlevendor.up.railway.app/graphql",
    WS_GRAPHQL_URL: "wss://enatega-singlevendor.up.railway.app/graphql",
  },
  staging: {
    GRAPHQL_URL: "https://enatega-singlevendor.up.railway.app/graphql",
    WS_GRAPHQL_URL: "wss://enatega-singlevendor.up.railway.app/graphql",
  },
  production: {
    GRAPHQL_URL: "https://enatega-singlevendor.up.railway.app/graphql",
    WS_GRAPHQL_URL: "wss://enatega-singlevendor.up.railway.app/graphql",
  },
};

const getEnvVars = (env = Constants.manifest) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    return ENV.development;
  } else if (env === "production") {
    return ENV.production;
  } else {
    return ENV.production;
  }
};

export default getEnvVars;
