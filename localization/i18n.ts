import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";
import { ProductStore } from "@/app/presentation/stores/product_store";
import { AccountStore } from "@/app/presentation/stores/account_store";

export const configureI18 = async () => {
  const store = new AccountStore();
  await store.fetchCurrentLang();
  let lang = store.lang;
  if (!lang) {
    lang = "en";
  }
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3", // for expo
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
};
