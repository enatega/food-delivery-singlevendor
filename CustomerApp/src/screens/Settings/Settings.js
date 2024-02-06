import { useMutation } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import * as Notifications from "expo-notifications";
import gql from "graphql-tag";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AppState,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Modalize } from "react-native-modalize";
import i18n from "../../../i18n";
import { moderateScale } from "../../utils/scaling";

import {
  updateUser,
  profile,
  pushToken,
  updateNotificationStatus,
} from "../../apollo/server";
import {
  CustomIcon,
  FlashMessage,
  Spinner,
  TextDefault,
  WrapperView,
} from "../../components";
import SwitchBtn from "../../components/FdSwitch/SwitchBtn";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import { ICONS_NAME } from "../../utils/constant";
import { scale } from "../../utils/scaling";
import SettingModal from "./components/SettingModal";
import useStyle from "./styles";

const languageTypes = [
  { value: "English", code: "en", index: 0 },
  { value: "français", code: "fr", index: 1 },
  { value: "ភាសាខ្មែរ", code: "km", index: 2 },
  { value: "中文", code: "zh", index: 3 },
  { value: "Deutsche", code: "de", index: 4 },
  { value: "Arabic", code: "ar", index: 5 },
];

const PUSH_TOKEN = gql`
  ${pushToken}
`;
const UPDATE_NOTIFICATION_TOKEN = gql`
  ${updateNotificationStatus}
`;
const PROFILE = gql`
  ${profile}
`;
const UPDATEUSER = gql`
  ${updateUser}
`;
function Settings() {
  const styles = useStyle();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { profile, logout } = useContext(UserContext);

  const [languageName, languageNameSetter] = useState("English");
  const [offerNotification, offerNotificationSetter] = useState(
    profile.is_offer_notification
  );
  const [orderNotification, orderNotificationSetter] = useState(
    profile.is_order_notification
  );
  const [activeRadio, activeRadioSetter] = useState(languageTypes[0].index);
  const [appState, setAppState] = useState(AppState.currentState);
  const [uploadToken] = useMutation(PUSH_TOKEN);
  const [updateUserInfo] = useMutation(UPDATEUSER);
  const [mutate, { loading }] = useMutation(UPDATE_NOTIFICATION_TOKEN, {
    onCompleted,
    onError,
    refetchQueries: [{ query: PROFILE }],
  });
  const modalizeRef = useRef(null);
  const modalizeRef1 = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("titleSettings"),
      headerRight: null,
    });
    selectLanguage();
    checkPermission();
  }, [navigation]);

  const _handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "active") {
      let token = null;
      const permission = await getPermission();
      if (permission === "granted") {
        if (!profile.notificationToken) {
          token = (await Notifications.getExpoPushTokenAsync()).data;
          uploadToken({ variables: { token } });
        }
        offerNotificationSetter(profile.is_offer_notification);
        orderNotificationSetter(profile.is_order_notification);
      } else {
        offerNotificationSetter(false);
        orderNotificationSetter(false);
      }
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );
    return () => {
      subscription.remove("change", _handleAppStateChange);
    };
  }, []);

  async function checkPermission() {
    const permission = await getPermission();
    if (permission !== "granted") {
      offerNotificationSetter(false);
      orderNotificationSetter(false);
    } else {
      offerNotificationSetter(profile.is_offer_notification);
      orderNotificationSetter(profile.is_order_notification);
    }
  }

  async function getPermission() {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  }

  async function selectLanguage() {
    const lang = await AsyncStorage.getItem("enatega-language");
    if (lang) {
      const defLang = languageTypes.findIndex((el) => el.code === lang);
      const langName = languageTypes[defLang].value;
      activeRadioSetter(defLang);
      languageNameSetter(langName);
    }
  }

  const onSelectedLanguage = async (active) => {
    const languageInd = active;
    if (Platform.OS === "android") {
      const localization = await Localization.getLocalizationAsync();
      localization.locale = languageTypes[languageInd].code;
      await AsyncStorage.setItem(
        "enatega-language",
        languageTypes[languageInd].code
      );
      i18n.locale = languageTypes[languageInd].code;
      const lang = await AsyncStorage.getItem("enatega-language");
      console.log(lang);
      const defLang = languageTypes.findIndex((el) => el.code === lang);
      const langName = languageTypes[defLang].value;
      activeRadioSetter(defLang);
      languageNameSetter(langName);
    }
  };

  const onClose = () => {
    modalizeRef.current.close();
  };

  function onCompleted() {
    FlashMessage({
      message: i18n.t("notificationUpdate"),
    });
  }

  function onError(error) {
    try {
      FlashMessage({
        message: error.networkError.result.errors[0].message,
      });
    } catch (err) {}
  }

  async function updateNotificationStatus(notificationCheck) {
    let orderNotify, offerNotify;
    if (!Device.isDevice) {
      FlashMessage({
        message: "Notification do not work on simulator",
      });
      return;
    }

    const permission = await getPermission();
    if (!profile.notificationToken || permission !== "granted") {
      Linking.openSettings();
    }
    if (notificationCheck === "offer") {
      offerNotificationSetter(!offerNotification);
      orderNotify = orderNotification;
      offerNotify = !offerNotification;
    }

    if (notificationCheck === "order") {
      orderNotificationSetter(!orderNotification);
      orderNotify = !orderNotification;
      offerNotify = offerNotification;
    }
    mutate({
      variables: {
        offerNotification: offerNotify,
        orderNotification: orderNotify,
      },
    });
  }

  async function updateUserInformation() {
    console.log("profile data", profile);
    updateUserInfo({
      variables: {
        name: profile.name,
        phone: profile.phone,
        is_active: false,
      },
    });
  }
  return (
    <WrapperView>
      {loading && (
        <View style={{ ...StyleSheet.absoluteFill }}>
          <Spinner />
        </View>
      )}
      <View style={[styles.flex, styles.mainContainer]}>
        <View style={alignment.Plarge}>
          {Platform.OS === "android" && (
            <View style={[styles.languageContainer, styles.shadow]}>
              <View style={styles.changeLanguage}>
                <View style={styles.headingLanguage}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.fontSecondColor}
                    medium
                    H5
                  >
                    {i18n.t("language")}
                  </TextDefault>
                  <TextDefault medium H5>
                    ({languageName})
                  </TextDefault>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => modalizeRef.current.open("top")}
                  style={styles.button}
                >
                  <CustomIcon
                    name={ICONS_NAME.Pencil}
                    size={scale(22)}
                    color={colors.fontMainColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              updateNotificationStatus("offer");
            }}
            style={[styles.notificationContainer, styles.shadow]}
          >
            <View style={styles.notificationChekboxContainer}>
              <TextDefault
                numberOfLines={1}
                textColor={colors.statusSecondColor}
              >
                {" "}
                {i18n.t("receiveOffers")}{" "}
              </TextDefault>
              <SwitchBtn
                isEnabled={offerNotification}
                onPress={() => {
                  updateNotificationStatus("offer");
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              updateNotificationStatus("order");
            }}
            style={[styles.notificationContainer, styles.shadow]}
          >
            <View style={styles.notificationChekboxContainer}>
              <TextDefault
                numberOfLines={1}
                textColor={colors.statusSecondColor}
              >
                {" "}
                {i18n.t("getUpdatesText")}{" "}
              </TextDefault>
              <SwitchBtn
                isEnabled={orderNotification}
                onPress={() => {
                  updateNotificationStatus("order");
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => modalizeRef1.current.open("top")}
            style={[styles.notificationContainer, styles.shadow]}
          >
            <View style={styles.notificationChekboxContainer}>
              <TextDefault numberOfLines={1} textColor={"red"}>
                {" "}
                {i18n.t("delAcc")}{" "}
              </TextDefault>
              <CustomIcon
                name={ICONS_NAME.Trash}
                size={scale(28)}
                color={"red"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TextDefault
        textColor={colors.fontSecondColor}
        style={alignment.MBsmall}
        center
      >
        {i18n.t("rightsReserved")}
      </TextDefault>

      {/* Modal for language Changes */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: false,
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height"
      >
        <SettingModal
          onClose={onClose}
          onSelectedLanguage={onSelectedLanguage}
          activeRadio={activeRadio}
        />
      </Modalize>
      {/* Modal for Delete Account */}
      <Modalize
        ref={modalizeRef1}
        adjustToContentHeight
        handlePosition="inside"
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: true,
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height"
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextDefault bolder H5 style={{ marginTop: 20 }}>
            {i18n.t("delAccText")}
          </TextDefault>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.buttonBackgroundBlue,
              borderRadius: moderateScale(10),
              width: "70%",
              padding: moderateScale(15),
              ...alignment.MTlarge,
            }}
            onPress={async () => {
              await updateUserInformation();
              logout();
              navigation.reset({
                routes: [{ name: "Menu" }],
              });
            }}
          >
            <TextDefault center>Delete Account</TextDefault>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.width100, alignment.PBlarge, alignment.PTlarge]}
            onPress={() => onClose()}
          >
            <TextDefault center>{i18n.t("cancel")}</TextDefault>
          </TouchableOpacity>
        </View>
      </Modalize>
    </WrapperView>
  );
}
export default Settings;
