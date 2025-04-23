import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ContainerGradient from "./ContainerGradient";

const AqiDisplay = ({ title }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <>
      <ContainerGradient>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <MaterialCommunityIcons
            name="information-outline"
            size={30}
            style={styles.infoIcon}
          />
          
        </View>
        <View style={styles.AQIValueContainer}>
          <Text style={styles.AQIValue}>200</Text>
          <Text style={styles.AQIWarningText}>Hazardous</Text>
          <View style={styles.adviceText}>
          <Text style={styles.text}>Sensitive groups: Avoid all outdoor physical activities</Text>
          <Text style={styles.text}>Everyone: Significantly cut back on outdoor physical activities</Text></View>
        </View>
      </ContainerGradient>
     
   
    </>
  );
};

export default AqiDisplay;

const createStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    headerText: {
      color: theme.accent,
      fontSize: 24,
      position: "absolute",
      textAlign: "center",
      left: 0,
      right: 0,
      fontWeight: "500",
    },
    infoIcon: {
      color: theme.infoIcon,
      padding: 10,
    },
    AQIValueContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    AQIValue: {
      color: theme.textAccent,
      fontWeight: 800,
      fontSize: 64,
    },
    AQIWarningText: {
      fontSize: 30,
      fontWeight: 600,
      color: theme.notification,
    },
    text: {
        color: theme.textPrimary,
      }
  });
