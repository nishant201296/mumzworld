import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  Button,
  Pressable,
  I18nManager,
} from "react-native";
import { ProductStore } from "../stores/product_store";
import { observer } from "mobx-react-lite";
import { SearchBar } from "./components/search_bar";
import { SearchResult } from "./components/search_result";
import React from "react";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Colors } from "@/app/utils/styles";
import { RadioButton } from "react-native-paper";
import { AccountStore } from "../stores/account_store";
import * as Updates from "expo-updates";

export const Language = () => {
  const store = new AccountStore();
  store.fetchCurrentLang();
  return <LanguageComponent store={store} />;
};

const LanguageComponent: React.FC<{ store: AccountStore }> = observer(
  ({ store }) => {
    const { t, i18n } = useTranslation();

    function changeLanguage(lang: string) {
      i18n.changeLanguage(lang).then(async () => {
        await store.setCurrentLang(lang);
        const isRTL = lang === "ar";
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        Updates.reloadAsync();
      });
    }

    if (!store.lang) return <></>;
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {t("choose_your_language")}
        </Text>
        <View style={styles.row}>
          <Text style={styles.text}>{t("arabic")}</Text>
          <RadioButton
            value="first"
            status={store.lang === "ar" ? "checked" : "unchecked"}
            onPress={() => {
              store.lang === "en" && changeLanguage("ar");
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>{t("english")}</Text>
          <RadioButton
            value="second"
            status={store.lang === "en" ? "checked" : "unchecked"}
            onPress={() => {
              store.lang === "ar" && changeLanguage("en");
            }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingStart: 10,
    borderRadius: 8,
    elevation: 4,
    width: 100,
    backgroundColor: Colors.semantic_bg_primary.color,
  },
  text: {
    marginRight: 10,
  },
});