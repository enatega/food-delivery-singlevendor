import { useMutation } from "@apollo/react-hooks";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as AppAuth from "expo-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import Constants from "expo-constants";
import * as Facebook from "expo-facebook";
//import * as Google from 'expo-google-app-auth'
import * as Google from "expo-auth-session/providers/google";
import * as Notifications from "expo-notifications";
import gql from "graphql-tag";
import React, { useContext, useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import getEnvVars from "../../../environment";
import { login } from "../../apollo/server";
import {
  EnategaImage,
  FdEmailBtn,
  FdFacebookBtn,
  FdGoogleBtn,
  FlashMessage,
  RegistrationHeader,
  Spinner,
  TextDefault,
  WrapperView,
} from "../../components";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import Analytics from "../../utils/analytics";
import { NAVIGATION_SCREEN } from "../../utils/constant";
import { scale } from "../../utils/scaling";
import useStyle from "./styles";

const {
  IOS_CLIENT_ID_GOOGLE,
  ANDROID_CLIENT_ID_GOOGLE,
  FACEBOOK_APP_ID,
  Expo_CLIENT_ID_GOOGLE,
} = getEnvVars();

const LOGIN = gql`
  ${login}
`;

const Logo = require("../../../assets/logo.png");
const CreateAccount = () => {
  const styles = useStyle();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [enableApple, setEnableApple] = useState(false);
  const [loginButton, loginButtonSetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setTokenAsync } = useContext(UserContext);

  useEffect(() => {
    checkIfSupportsAppleAuthentication();
  }, []);

  const [mutate] = useMutation(LOGIN, { onCompleted, onError });

  async function checkIfSupportsAppleAuthentication() {
    setEnableApple(await AppleAuthentication.isAvailableAsync());
  }

  async function onCompleted(data) {
    try {
      const trackingOpts = {
        id: data.login.userId,
        usernameOrEmail: data.login.email,
      };
      Analytics.identify(data.login.userId, trackingOpts);
      Analytics.track(Analytics.events.USER_CREATED_ACCOUNT, trackingOpts);
      setTokenAsync(data.login.token);
      navigation.navigate(NAVIGATION_SCREEN.Menu);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  function onError(error) {
    try {
      console.log(JSON.stringify(error));
      FlashMessage({
        message: error.graphQLErrors[0].message,
      });
      loginButtonSetter(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function mutateLogin(user) {
    setLoading(true);
    let notificationToken = null;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus === "granted") {
        notificationToken = (await Notifications.getExpoPushTokenAsync()).data;
      }
    }
    mutate({ variables: { ...user, notificationToken } });
  }

  function renderAppleAction() {
    if (loading && loginButton === "Apple") {
      return (
        <View style={styles.buttonBackground}>
          <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.tagColor} />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.appleBtn}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            if (credential) {
              const user = {
                appleId: credential.user,
                phone: "",
                email: credential.email,
                password: "",
                name:
                  credential.fullName.givenName +
                  " " +
                  credential.fullName.familyName,
                picture: "",
                type: "apple",
              };
              mutateLogin(user);
            }
            loginButtonSetter("Apple");
            // signed in
          } catch (e) {
            if (e.code === "ERR_CANCELLED") {
              // handle that the user canceled the sign-in flow
              loginButtonSetter(null);
            } else {
              // handle other errors
              loginButtonSetter(null);
            }
          }
        }}
      >
        <FontAwesome
          style={styles.marginLeft5}
          name="apple"
          size={scale(19)}
          color="#000"
        />
        <TextDefault style={alignment.MLsmall} bold>
          Signup with Apple
        </TextDefault>
      </TouchableOpacity>
    );
  }

  async function _facebookSignup() {
    try {
      await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID });
    } catch (err) {
      console.log("err", err);
    }

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,name`
        );
        const user = await response.json();
        return user;
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId: Expo_CLIENT_ID_GOOGLE,
      iosClientId: IOS_CLIENT_ID_GOOGLE,
      iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
      androidClientId: ANDROID_CLIENT_ID_GOOGLE,
      androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
      //redirectUrl: `${AuthSession.OAuthRedirect}:/oauth2redirect/google`,
      scopes: ["profile", "email"],
      ...{ useProxy: true },
    });

  const googleSignUp = () => {
    if (googleResponse?.type === "success") {
      const { authentication } = googleResponse;
      console.log(authentication.accessToken);
      (async () => {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: { Authorization: `Bearer ${authentication.accessToken}` },
          }
        );
        const googleUser = await userInfoResponse.json();
        const user = {
          phone: "",
          email: googleUser.email,
          password: "",
          name: googleUser.name,
          picture: googleUser.picture,
          type: "google",
        };
        mutateLogin(user);
      })();
    }
  };

  useEffect(() => {
    googleSignUp();
  }, [googleResponse]);

  function renderFacebookAction() {
    return (
      <FdFacebookBtn
        loadingIcon={loading && loginButton === "Facebook"}
        onPressIn={() => {
          loginButtonSetter("Facebook");
        }}
        onPress={async () => {
          const facebookUser = await _facebookSignup();
          if (facebookUser) {
            const user = {
              facebookId: facebookUser.id,
              phone: "",
              email: facebookUser.email,
              password: "",
              name: facebookUser.name,
              picture: "",
              type: "facebook",
            };
            mutateLogin(user);
          }
        }}
      />
    );
  }
  function renderGoogleAction() {
    return (
      <FdGoogleBtn
        loadingIcon={loading && loginButton === "Google"}
        onPressIn={() => {
          loginButtonSetter("Google");
        }}
        disabled={!googleRequest}
        onPress={() => googlePromptAsync()}
      />
    );
  }
  function renderEmailAction() {
    return (
      <FdEmailBtn
        loadingIcon={loading && loginButton === "Email"}
        onPress={() => {
          loginButtonSetter("Email");
          navigation.navigate(NAVIGATION_SCREEN.Register);
        }}
      />
    );
  }

  return (
    <WrapperView>
      <View style={[styles.mainContainer, styles.flex]}>
        <RegistrationHeader title={"Get Started"} />
        <View style={styles.subContainer}>
          <View style={[styles.flex, styles.upperContainer]}>
            <EnategaImage
              imgStyle={styles.imgResponsive}
              imgSource={Logo}
              spinnerProps={{ style: styles.loadingView }}
            />
          </View>
          <View style={styles.width100}>
            {Platform.OS === "ios" && renderFacebookAction()}
            <View style={alignment.MTmedium}>{renderGoogleAction()}</View>
            {enableApple && (
              <View style={alignment.MTmedium}>{renderAppleAction()}</View>
            )}

            <View style={alignment.MTmedium}>{renderEmailAction()}</View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.alreadyBtn}
              onPress={() => navigation.navigate(NAVIGATION_SCREEN.Login)}
            >
              <TextDefault style={[alignment.MLsmall]} bold>
                Already a member? Log in
              </TextDefault>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </WrapperView>
  );
};
export default CreateAccount;
