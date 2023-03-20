/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from "expo-constants";

const ENV = {
  development: {
    GRAPHQL_URL: "http://10.97.28.88.90:8000/graphql",
    WS_GRAPHQL_URL: "ws://10.97.28.88.90:8000/graphql",
    SERVER_URL: "http://10.97.28.88.90:8000/", // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE: "",
    ANDROID_CLIENT_ID_GOOGLE: "",
    FACEBOOK_APP_ID: "404956210315749",
    AMPLITUDE_API_KEY: "",
    STRIPE_PUBLIC_KEY: "",
    STRIPE_IMAGE_URL: "http://10.97.28.88.90:8000/assets/images/logo.png",
    STRIPE_STORE_NAME: "Enatega",
  },
  staging: {
    GRAPHQL_URL: "https://staging-enatega-single-api.herokuapp.com/graphql",
    WS_GRAPHQL_URL: "wss://staging-enatega-single-api.herokuapp.com/graphql",
    SERVER_URL: "https://staging-enatega-single-api.herokuapp.com/", // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE: "",
    ANDROID_CLIENT_ID_GOOGLE: "",
    FACEBOOK_APP_ID: "404956210315749",
    AMPLITUDE_API_KEY: "",
    STRIPE_PUBLIC_KEY: "",
    STRIPE_IMAGE_URL:
      "https://staging-enatega-single-api.herokuapp.com/assets/images/logo.png",
    STRIPE_STORE_NAME: "Enatega",
  },
  production: {
    GRAPHQL_URL: "https://prod-enatega-single-api.herokuapp.com/graphql",
    WS_GRAPHQL_URL: "wss://prod-enatega-single-api.herokuapp.com/graphql",
    SERVER_URL: "https://prod-enatega-single-api.herokuapp.com/", // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE: "",
    ANDROID_CLIENT_ID_GOOGLE: "",
    FACEBOOK_APP_ID: "3017447961609878",
    AMPLITUDE_API_KEY: "",
    STRIPE_PUBLIC_KEY: "",
    STRIPE_IMAGE_URL:
      "https://prod-enatega-single-api.herokuapp.com/assets/images/logo.png",
    STRIPE_STORE_NAME: "Enatega",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    return ENV.development;
  } else if (env === "production") {
    return ENV.production;
  } else if (env === "staging") {
    return ENV.staging;
  } else {
    return ENV.production;
  }
};

export default getEnvVars;
