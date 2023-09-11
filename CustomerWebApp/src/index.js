import { ThemeProvider } from "@material-ui/core";
import { LoadScript } from "@react-google-maps/api";
import React from "react";
import ReactDOM from "react-dom";
import ApolloSetup from "./apollo/ApolloSetup";
import App from "./App";
import { AlertProvider, UserProvider, ConfigurationProvider } from "./context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import theme from "./utils/theme";

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <ApolloSetup>
      <ConfigurationProvider>
      <UserProvider>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA"
          libraries={["places"]}
        >
          <AlertProvider>
            <App />
          </AlertProvider>
        </LoadScript>
      </UserProvider>
      </ConfigurationProvider>
    </ApolloSetup>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
