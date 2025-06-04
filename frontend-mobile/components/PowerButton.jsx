import React from "react";
import { useTheme } from "../theme/ThemeContext";
import { Pressable, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PowerButton = ({ isOn, togglePower }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.circleWrapper}>
      <View style={styles.circleShadow}>
        <Pressable
          onPress={togglePower}
          style={styles.circleButton}
          accessible={true}
          accessibilityLabel="Power button"
          accessibilityRole="button"
          accessibilityState={{ pressed: isOn }}
          accessibilityHint="Toggles power on or off"
        >
          <MaterialCommunityIcons
            name="power"
            size={60}
            color={isOn ? "#00FF1A" : "#FF0000"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    circleWrapper: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    circleShadow: {
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 30,
      borderRadius: 100,
    },
    circleButton: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.circleBackground,
      borderColor: "#000",
    },
  });

export default PowerButton;
