import { StyleSheet, Pressable, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

const RefreshButton = ({ onRefresh }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View>
      <Pressable onPress={onRefresh}>
        <MaterialCommunityIcons name={"refresh"} size={30} color={theme.accent} />
      </Pressable>
    </View>
  );
};

export default RefreshButton;

const createStyles = (theme) => StyleSheet.create({});
