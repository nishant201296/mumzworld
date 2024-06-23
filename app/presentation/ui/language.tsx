import { Colors } from "@/app/utils/styles";
import * as Updates from "expo-updates";
import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { AccountStore } from "../stores/account_store";

export const Language = () => {
  const store = new AccountStore();
  store.fetchCurrentLang();
  return <LanguageComponent store={store} />;
};

const LanguageComponent: React.FC<{ store: AccountStore }> = observer(
  ({ store }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = async (lang: string) => {
      const isRTL = lang === "ar";
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      await i18n.changeLanguage(lang);
      await store.setCurrentLang(lang);

      setTimeout(() => {
        Updates.reloadAsync();
      }, 500);
    };

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
          <RadioButton.Android
            value="first"
            status={store.lang === "ar" ? "checked" : "unchecked"}
            onPress={() => {
              store.lang === "en" && changeLanguage("ar");
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>{t("english")}</Text>
          <RadioButton.Android
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
    paddingTop: 200,
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
    width: 120,
    backgroundColor: Colors.semantic_bg_primary.color,
  },
  text: {
    marginRight: 10,
  },
});
