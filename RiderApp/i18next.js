import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Platform } from "react-native";
import { en } from "./languages/en";
import { de } from "./languages/de";
import { fr } from "./languages/fr";
import { km } from "./languages/km";
import { zh } from "./languages/zh";
import { ar } from "./languages/ar";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const languageResources = {
  en: { translation: en },
  zh: { translation: zh },
  de: { translation: de },
  fr: { translation: fr },
  km: { translation: km },
  ar: { translation: ar },
};

const i18n = i18next.createInstance();

// Configure i18next instance
i18n
  .use(initReactI18next) // Ensure initReactI18next is used
  .init({
    compatibilityJSON: "v3",
    lng: "en", // Default language
    fallbackLng: "en",
    resources: languageResources,
  });

// Fetch stored language and set i18next instance accordingly
const getStoredLanguage = async () => {
  const lng = await AsyncStorage.getItem("enatega-language");
  i18n.changeLanguage(lng || "en"); // Change language
};

// Execute language initialization based on platform
if (Platform.OS === "android" || Platform.OS === "ios") {
  getStoredLanguage();
}

export default i18n;
