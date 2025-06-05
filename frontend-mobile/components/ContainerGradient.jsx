import { StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

const ContainerGradient = ({ children }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

export default ContainerGradient;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      margin: 10,
      width: "95%",
      padding: 10,
      borderRadius: 10,
      // for android shadow
      elevation: 4,
      // for iphone shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
  });
