import { Colors } from "@/app/utils/styles";
import * as Updates from "expo-updates";
import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, StyleSheet, Text, View } from "react-native";
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
      }, 100);
    };

    const changeToEnglish = () => {
      store.lang === "ar" && changeLanguage("en");
    };

    const changeToArabic = () => {
      store.lang === "en" && changeLanguage("ar");
    };

    const getTextColorFor = (lang: string) => {
      return store.lang === lang ? Colors.white.color : "black";
    };

    const getBGColorFor = (lang: string) => {
      return store.lang === lang
        ? Colors.semantic_fg_accent.color
        : Colors.semantic_bg_muted.color;
    };

    if (!store.lang) return <></>;

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {t("choose_your_language")}
        </Text>

        <Pressable onPress={changeToEnglish}>
          <View
            style={[
              styles.language,
              {
                backgroundColor: getBGColorFor("en"),
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: getTextColorFor("en"),
                },
              ]}
            >{`${t("english")}`}</Text>
          </View>
        </Pressable>
        <Pressable onPress={changeToArabic}>
          <View
            style={[
              styles.language,
              {
                backgroundColor: getBGColorFor("ar"),
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: getTextColorFor("ar"),
                },
              ]}
            >{`${t("arabic")}`}</Text>
          </View>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  language: {
    flexDirection: "row",
    borderRadius: 8,
    elevation: 4,
    width: 200,
    backgroundColor: Colors.semantic_bg_primary.color,
    marginVertical: 8,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 16,
  },
});
