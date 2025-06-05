import { StyleSheet, Pressable, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

const RefreshButton = ({ onRefresh }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
      <Pressable onPress={onRefresh}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Press to refresh chart"
      accessibilityHint="Refreshes the chart with the latest data"
      android_ripple={{ color: theme.tabBarIcon }}>
        <MaterialCommunityIcons name={"refresh"} size={30} color={theme.accent} />
      </Pressable>
  );
};

export default RefreshButton;

const createStyles = (theme) => StyleSheet.create({});
