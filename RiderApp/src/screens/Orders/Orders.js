import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { AssignedOrders, NewOrders, TextDefault } from "../../components";
import colors from "../../utilities/colors";
import useStyle from "./style";

const BACKGROUND_IMAGE = require("../../../assets/images/ui/BG.png");

export default function Orders() {
  const { t } = useTranslation();
  const styles = useStyle();
  const [isNewOrderSelected, setIsNewOrderSelected] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, [isNewOrderSelected]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: t("Orders"),
    });
  }, [t, navigation]);

  return (
    <View style={[styles.flex, styles.bottom]}>
      <ImageBackground style={styles.imageContainer} source={BACKGROUND_IMAGE}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewOrderSelected(false)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: !isNewOrderSelected
                  ? colors.buttonBackgroundPink
                  : "transparent",
              },
            ]}
          >
            <TextDefault bold H5 numberOfLines={1}>
              {t("myOrders")}
            </TextDefault>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewOrderSelected(true)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: isNewOrderSelected
                  ? colors.buttonBackgroundPink
                  : "transparent",
              },
            ]}
          >
            <TextDefault bold H5 numberOfLines={1}>
              {t("newOrders")}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {!isNewOrderSelected ? <AssignedOrders /> : <NewOrders />}
    </View>
  );
}
