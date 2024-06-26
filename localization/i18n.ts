import { AccountStore } from "@/app/presentation/stores/account_store";
import * as Updates from "expo-updates";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import ar from "./ar.json";
import en from "./en.json";

export const configureI18 = async () => {
  const store = new AccountStore();
  const lang = await store.getCurrentLang();

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: lang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
  const isRTL = lang === "ar";

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    Updates.reloadAsync();
  }
};
