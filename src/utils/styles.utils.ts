import { StyleSheet } from "react-native";
import { colors } from "./colors.utils";
import { DefaultTheme } from "@react-navigation/native";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export const commonStyles = StyleSheet.create({
  viewWrapper: {
    display: "flex",
    width: "90%",
    alignSelf: "center",
    // backgroundColor: '#f02',
  },
  primaryText: {
    color: colors.black,
    fontFamily: "Inter-Medium",
  },
  secondaryText: {
    color: colors.gray3,
    fontFamily: "Inter-Medium",
  },
});
