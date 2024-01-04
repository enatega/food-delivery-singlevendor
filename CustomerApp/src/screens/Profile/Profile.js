import { useMutation } from "@apollo/react-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import gql from "graphql-tag";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { TextField } from "react-native-material-textfield";
import i18n from "../../../i18n";
import { updateUser } from "../../apollo/server";
import {
  FlashMessage,
  RightButton,
  TextDefault,
  WrapperView,
} from "../../components";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import { ICONS_NAME } from "../../utils/constant";
import { moderateScale, scale } from "../../utils/scaling";
import { textStyles } from "../../utils/textStyles";
import ChangePassword from "./ChangePassword";
import useStyle from "./styles";

const UPDATEUSER = gql`
  ${updateUser}
`;

function Profile() {
  const refName = useRef();
  const route = useRoute();
  const styles = useStyle();
  const refPhone = useRef(null);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [toggleView, setToggleView] = useState(true);
  const [modelVisible, setModalVisible] = useState(false);

  const { profile } = useContext(UserContext);
  const backScreen = route.params ? route.params.backScreen : null;

  const [mutate, { loading: loadingMutation }] = useMutation(UPDATEUSER, {
    onCompleted,
    onError,
  });

  const [title, setTitle] = useState('titleProfile');

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: () => (
      //   <TextDefault center H4 bold>
      //     {title || 'Profile'}
      //   </TextDefault>
      // ),
      // title: "Profile",
      headerTitle: i18n.t(title),
      headerRight: () => (
        <RightButton
          icon={toggleView ? ICONS_NAME.Pencil : ICONS_NAME.Cross}
          onPress={viewHideAndShow}
          iconSize={scale(18)}
        />
      ),
    });
  }, [navigation, toggleView]);


  useEffect(() => {
    if (backScreen) {
      viewHideAndShow();
      setPhoneError(i18n.t('phoneNumberRequired'));
      FlashMessage({
        message: i18n.t('phoneNumberMissing'),
      });
    }
  }, [backScreen]);

  function viewHideAndShow() {
    setToggleView((prev) => !prev);
  }

  function onCompleted({ updateUser }) {
    if (updateUser) {
      FlashMessage({
        message: i18n.t('userInfoUpdated'),
      });
      if (backScreen) {
        navigation.goBack();
      }
    }
  }

  function validateInfo() {
    // clear errors
    setNameError("");
    setPhoneError("");

    const name = refName.current.value();
    const phone = refPhone.current.value();

    if (name === profile.name && phone === profile.phone && phone.length > 0) {
      return;
    }
    let res = true;
    if (!name.trim()) {
      refName.current.focus();
      setNameError(i18n.t('nameReq'));
      res = false;
    }
    const num = phone.trim().replace(".", "");
    if (num.length < 11 || num.length > 15 || isNaN(num)) {
      setPhoneError(i18n.t('minWords'));
      if (res) {
        refPhone.current.focus();
      }
      res = false;
    }
    return res;
  }

  function onError(error) {
    try {
      if (error.graphQLErrors) {
        FlashMessage({
          message: error.graphQLErrors[0].message,
        });
      } else if (error.networkError) {
        FlashMessage({
          message: error.networkError.result.errors[0].message,
        });
      }
    } catch (err) {}
  }

  function changePasswordTab() {
    return (
      <View style={styles.containerInfo}>
        <TextField
          label={i18n.t("name")}
          ref={refName}
          editable={false}
          defaultValue={profile.name ? profile.name : null}
          labelFontSize={scale(12)}
          fontSize={scale(12)}
          style={{
            ...textStyles.Medium,
            ...textStyles.H5,
            color: colors.fontMainColor,
          }}
          maxLength={20}
          textColor={colors.fontMainColor}
          baseColor={colors.fontSecondColor}
          errorColor={colors.errorColor}
          tintColor={!nameError ? colors.tagColor : "red"}
          labelTextStyle={{
            ...textStyles.Normal,
            paddingTop: scale(1),
          }}
          error={nameError}
        />
        <View style={{ ...alignment.MTxSmall }}></View>
        <TextField
          keyboardType={"email-address"}
          label={i18n.t("email")}
          style={{
            ...textStyles.Medium,
            ...textStyles.H5,
            color: colors.fontMainColor,
          }}
          editable={false}
          defaultValue={profile.email}
          labelFontSize={scale(12)}
          fontSize={scale(12)}
          textColor={colors.fontMainColor}
          baseColor={colors.fontSecondColor}
          errorColor={colors.errorColor}
          tintColor={colors.tagColor}
          labelTextStyle={{
            ...textStyles.Normal,
            paddingTop: scale(1),
          }}
        />
        <View style={{ ...alignment.MTxSmall }}></View>
        <TextField
          keyboardType={"phone-pad"}
          label={i18n.t("phone")}
          ref={refPhone}
          editable={false}
          defaultValue={profile.phone}
          style={{
            ...textStyles.Medium,
            ...textStyles.H5,
            color: colors.fontMainColor,
          }}
          labelFontSize={scale(12)}
          fontSize={scale(12)}
          maxLength={15}
          textColor={colors.fontMainColor}
          baseColor={colors.fontSecondColor}
          errorColor={colors.errorColor}
          tintColor={!phoneError ? colors.tagColor : "red"}
          labelTextStyle={{
            ...textStyles.Normal,
            paddingTop: scale(1),
          }}
          error={phoneError}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.changePassword}
        >
          <TextDefault>{i18n.t('changePass')}</TextDefault>
          <MaterialCommunityIcons
            name={"pencil"}
            size={20}
            color={colors.tagColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <WrapperView>
      <ChangePassword
        modalVisible={modelVisible}
        hideModal={() => {
          setModalVisible(false);
        }}
      />
      <View style={styles.formContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.flex}
        >
          <ScrollView style={styles.flex}>
            <View style={[styles.formSubContainer]}>
              <View
                style={{
                  width: scale(100),
                  paddingTop: scale(10),
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  height: scale(100),
                  top: moderateScale(-50),
                  borderColor: colors.buttonBackground,
                  borderWidth: 2,
                  borderRadius: scale(10),
                  borderStyle: "dashed",
                }}
              >
                <View style={styles.imgContainer}>
                  <TextDefault textColor={colors.tagColor} bold H1>
                    {profile.name.substr(0, 1).toUpperCase()}
                  </TextDefault>
                </View>
              </View>
              {toggleView ? (
                changePasswordTab()
              ) : (
                <View style={styles.containerInfo}>
                  <View>
                    <View style={{ margin: scale(0) }}></View>
                    <TextField
                      label={i18n.t("name")}
                      ref={refName}
                      defaultValue={profile.name}
                      style={{
                        ...textStyles.Bold,
                        ...textStyles.H5,
                        color: colors.fontMainColor,
                      }}
                      labelFontSize={scale(12)}
                      fontSize={scale(12)}
                      maxLength={20}
                      textColor={colors.fontMainColor}
                      baseColor={colors.fontSecondColor}
                      errorColor={colors.errorColor}
                      tintColor={!nameError ? colors.buttonBackground : "red"}
                      labelTextStyle={{
                        ...textStyles.Normal,
                        paddingTop: scale(1),
                      }}
                      error={nameError}
                    />
                    <View style={{ ...alignment.MTxSmall }}></View>
                    <TextField
                      keyboardType={"email-address"}
                      label={i18n.t("email")}
                      style={{
                        ...textStyles.Bold,
                        ...textStyles.H5,
                        color: colors.fontMainColor,
                      }}
                      editable={false}
                      defaultValue={profile.email}
                      labelFontSize={scale(12)}
                      fontSize={scale(12)}
                      textColor={colors.fontMainColor}
                      baseColor={colors.fontSecondColor}
                      errorColor={colors.errorColor}
                      tintColor={colors.buttonBackground}
                      labelTextStyle={{
                        ...textStyles.Normal,
                        paddingTop: scale(1),
                      }}
                    />
                    <View style={{ ...alignment.MTxSmall }}></View>
                    <TextField
                      keyboardType={"phone-pad"}
                      label={i18n.t("phone")}
                      style={{
                        ...textStyles.Bold,
                        ...textStyles.H5,
                        color: colors.fontMainColor,
                      }}
                      ref={refPhone}
                      defaultValue={profile.phone}
                      labelFontSize={scale(12)}
                      fontSize={scale(12)}
                      maxLength={15}
                      textColor={colors.fontMainColor}
                      baseColor={colors.fontSecondColor}
                      errorColor={colors.errorColor}
                      tintColor={!phoneError ? colors.buttonBackground : "red"}
                      labelTextStyle={{
                        ...textStyles.Normal,
                        paddingTop: scale(1),
                      }}
                      error={phoneError}
                    />
                  </View>

                  <TouchableOpacity
                    disabled={loadingMutation}
                    activeOpacity={0.7}
                    style={styles.saveContainer}
                    onPress={() => {
                      if (validateInfo()) {
                        mutate({
                          variables: {
                            name: refName.current.value(),
                            phone: refPhone.current.value(),
                            is_active: true,
                          },
                        });
                      }
                    }}
                  >
                    <TextDefault
                      textColor={colors.buttonText}
                      H5
                      bold
                      style={[alignment.MTsmall, alignment.MBsmall]}
                    >
                      {i18n.t("saveBtn")}
                    </TextDefault>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignSelf: "center", ...alignment.MTsmall }}
                    activeOpacity={0.7}
                    onPress={viewHideAndShow}
                  >
                    <TextDefault
                      textColor={colors.fontMainColor}
                      H5
                      bold
                      style={[alignment.MTsmall, alignment.MBsmall]}
                    >
                      {i18n.t('cancel')}
                    </TextDefault>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TextDefault
              center
              textColor={colors.fontSecondColor}
              style={alignment.MBsmall}
            >
              {i18n.t('rightsReserved')}
            </TextDefault>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </WrapperView>
  );
}

export default Profile;
