import { useMutation } from "@apollo/react-hooks";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import gql from "graphql-tag";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { FilledTextField } from "react-native-material-textfield";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import i18n from "../../../i18n";
import { login } from "../../apollo/server";
import {
  EnategaImage,
  FlashMessage,
  RegistrationHeader,
  TextDefault,
  WrapperView,
} from "../../components";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import Analytics from "../../utils/analytics";
import { NAVIGATION_SCREEN } from "../../utils/constant";
import { scale, verticalScale } from "../../utils/scaling";
import useStyle from "./styles";

// Constants
const LOGIN = gql`
  ${login}
`;

const Logo = require("../../../assets/logo.png");

function Login() {
  let _didFocusSubscription = null;
  let _willBlurSubscription = null;
  const styles = useStyle();
  const inset = useSafeAreaInsets();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("john@test.com");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("123123");
  const [emailError, setEmailError] = useState("");
  const { setTokenAsync } = useContext(UserContext);
  const [passwordError, setPasswordError] = useState(null);

  const [mutate] = useMutation(LOGIN, { onCompleted, onError });

  useEffect(() => {
    _didFocusSubscription = navigation.addListener("didFocus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        onBackButtonPressAndroid
      );
    });
    _willBlurSubscription = navigation.addListener("willBlur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        onBackButtonPressAndroid
      );
    });
    return () => {
      _didFocusSubscription && _didFocusSubscription();
      _willBlurSubscription && _willBlurSubscription();
      BackHandler.removeEventListener(
        "hardwareBackPress",
        onBackButtonPressAndroid
      );
    };
  }, []);
  function validateCredentials() {
    let result = true;
    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError("Email/Phone is required");
      result = false;
    } else {
      const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
      const phoneRegex = /^[+]\d{6,15}$/;
      if (emailRegex.test(email) !== true && phoneRegex.test(email) !== true) {
        setEmailError("Invalid Email/Phone");
        result = false;
      }
    }
    if (!password) {
      setPasswordError("Password is required");
      result = false;
    }
    return result;
  }
  async function onCompleted(data) {
    try {
      const trackingOpts = {
        id: data.login.userId,
        usernameOrEmail: data.login.email,
      };

      Analytics.identify(data.login.userId, trackingOpts);
      Analytics.track(Analytics.events.USER_LOGGED_IN, trackingOpts);
      setTokenAsync(data.login.token);
      console.log("Data Before Navigation:", data.login.is_active);
      if (!data.login.is_active) {
        FlashMessage({
          message: "Can't Login,This Account is Deleted!",
        });
      }
      {
        data.login.is_active && navigation.navigate(NAVIGATION_SCREEN.Menu);
      }

      // {
      //   FlashMessage({
      //     message: "Can't Login,This Account is Deleted!",
      //   });
      // }
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
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function onBackButtonPressAndroid() {
    navigation.navigate(NAVIGATION_SCREEN.Menu);
    return true;
  }

  async function mutateLogin(user) {
    try {
      setLoading(true);
      let notificationToken = null;
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        if (existingStatus === "granted") {
          notificationToken = (await Notifications.getExpoPushTokenAsync())
            .data;
        }
      }
      mutate({ variables: { ...user, notificationToken } });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  function renderLoginAction() {
    return (
      <TouchableOpacity
        style={styles.loginBtn}
        activeOpacity={0.7}
        onPress={async () => {
          const user = {
            email: email,
            password: password,
            type: "default",
          };
          if (validateCredentials()) {
            mutateLogin(user);
          }
        }}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ flex: 1, justifyContent: "center" }}
            color={colors.buttonText}
          />
        ) : (
          <TextDefault bold>{i18n.t("loginBtn")}</TextDefault>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <WrapperView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          style={[styles.flex, { paddingTop: inset.top }]}
          contentContainerStyle={{ flexGrow: 1, paddingTop: verticalScale(20) }}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <View style={styles.mainContainer}>
            <RegistrationHeader title={"Login"} back />
            <View style={styles.subContainer}>
              <View style={[styles.flex, styles.upperContainer]}>
                <EnategaImage
                  imgStyle={styles.imgResponsive}
                  imgSource={Logo}
                  spinnerProps={{ style: styles.loadingView }}
                />
              </View>
              <View style={styles.width100}>
                <TextDefault medium textColor={colors.fontSecondColor}>
                  Enter your Email and Password
                </TextDefault>
                <View style={styles.marginTop3} />
                <FilledTextField
                  defaultValue={"john@test.com"}
                  error={emailError}
                  keyboardType={"email-address"}
                  label={i18n.t("emailphone")}
                  labelFontSize={scale(12)}
                  fontSize={scale(12)}
                  activeLineWidth={0}
                  lineWidth={0}
                  labelHeight={20}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={(text) => {
                    setEmail(text.toLowerCase().trim());
                  }}
                />
                <FilledTextField
                  defaultValue={"123123"}
                  error={passwordError}
                  label={i18n.t("password")}
                  secureTextEntry
                  labelFontSize={scale(12)}
                  fontSize={scale(12)}
                  activeLineWidth={0}
                  labelHeight={10}
                  lineWidth={0}
                  textColor={colors.fontMainColor}
                  baseColor={colors.fontMainColor}
                  errorColor={colors.errorColor}
                  tintColor={colors.selected}
                  labelTextStyle={styles.labelStyle}
                  inputContainerStyle={styles.textContainer}
                  onChangeText={(text) => {
                    setPassword(text.trim());
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() =>
                    navigation.navigate(NAVIGATION_SCREEN.ForgotPassword)
                  }
                >
                  <TextDefault
                    style={[alignment.PTmedium, alignment.PBxSmall]}
                    medium
                    center
                  >
                    Forgot Password?
                  </TextDefault>
                </TouchableOpacity>
                <View style={[styles.marginTop3]}>{renderLoginAction()}</View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[alignment.MTlarge, styles.loginBtn, styles.whiteBtn]}
                  onPress={() =>
                    navigation.navigate(NAVIGATION_SCREEN.CreateAccount)
                  }
                >
                  <TextDefault textColor={colors.fontSecondColor} bold center>
                    Create New Account
                  </TextDefault>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperView>
  );
}

export default Login;
