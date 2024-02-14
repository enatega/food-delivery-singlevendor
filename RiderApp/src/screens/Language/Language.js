import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import i18n from "../../../i18next";
import { useTranslation } from "react-i18next";
import { MainWrapper } from "../../components";
import RadioButton from "../../components/FdRadioBtn/RadioBtn";
import TextDefault from "../../components/Text/TextDefault/TextDefault";
import { alignment } from "../../utilities/alignment";
import colors from "../../utilities/colors";
import { scale } from "../../utilities/scaling";
import styles from "./styles";

const languageTypes = [
  { value: "English", code: "en", index: 0 },
  { value: "français", code: "fr", index: 1 },
  { value: "ភាសាខ្មែរ", code: "km", index: 2 },
  { value: "中文", code: "zh", index: 3 },
  { value: "Deutsche", code: "de", index: 4 },
  { value: "Arabic", code: "ar", index: 5 },
];

function Language() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [activeRadio, setActiveRadio] = useState(languageTypes[0].index);
  const [languageName, languageNameSetter] = useState("English");
  const [loadinglang, setLoadingLang] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("titleLanguage"),
    });
  }, [t, navigation]);

  useEffect(() => {
    selectedLanguageFunc();
  }, []);

  async function selectedLanguageFunc() {
    const lang = await AsyncStorage.getItem("enatega-language");
    if (lang) {
      const defLang = languageTypes.findIndex((el) => el.code === lang);
      const langName = languageTypes[defLang].value;
      setActiveRadio(defLang);
      languageNameSetter(langName);
    }
  }

  async function onSelectedLanguage() {
    try {
      setLoadingLang(true);
      const languageInd = activeRadio;
      await AsyncStorage.setItem(
        "enatega-language",
        languageTypes[languageInd].code
      );
      var lang = await AsyncStorage.getItem("enatega-language");
      if (lang) {
        const defLang = languageTypes.findIndex((el) => el.code === lang);
        const langName = languageTypes[defLang].value;
        languageNameSetter(langName);
      }
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error("Error during language selection:", error);
    } finally {
      setLoadingLang(false);
    }
  }

  return (
    <MainWrapper>
      <View style={[styles.flex, styles.mainView]}>
        <View style={[styles.languageContainer]}>
          {languageTypes.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              onPress={() => setActiveRadio(item.index)}
              style={[styles.radioContainer]}
            >
              <TextDefault
                numberOfLines={1}
                textColor={
                  activeRadio === item.index
                    ? colors.fontMainColor
                    : colors.placeHolderColor
                }
                bold
                H5
                style={alignment.MLsmall}
              >
                {item.value}
              </TextDefault>
              <RadioButton
                animation={"bounceIn"}
                size={13}
                outerColor={colors.tagColor}
                innerColor={colors.radioColor}
                isSelected={activeRadio === item.index}
                onPress={() => setActiveRadio(item.index)}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelectedLanguage()}
            style={{
              backgroundColor: colors.tagColor,
              width: "72%",
              borderRadius: scale(10),
              alignSelf: "center",
              alignItems: "center",
              height: scale(40),
              justifyContent: "center",
            }}
          >
            <TextDefault H5 bold textColor={colors.fontSecondColor}>
              {t("Done")}
            </TextDefault>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{
              width: "72%",
              alignSelf: "center",
              alignItems: "center",
              height: scale(40),
              justifyContent: "center",
            }}
          >
            <TextDefault H5 bold textColor={colors.fontMainColor}>
              {t("Cancel")}
            </TextDefault>
          </TouchableOpacity>
        </View>
        {loadinglang && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </MainWrapper>
  );
}

export default Language;
