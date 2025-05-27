import { StyleSheet, Pressable, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";
import CustomSwitch from "../components/CustomSwitch";
import BoxGradient from "../components/BoxGradient";

const Settings = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  const [isEnabled, setIsEnabled] = useState(false);

  // toggle funktion för showNotification
  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (newValue) {
      //Anropa shownotification
      console.log(newValue);
    }
  };

  return (
    <Background>
      <ContainerGradient>
        <BoxGradient>
        <View>
          <View style={styles.option}>
            <Text style={styles.text}>Notifications:</Text>
          <CustomSwitch
            isOn={isEnabled}
            onToggle={toggleSwitch}
            onIcon={"bell"}
            offIcon={"bell-off"}
          />
          
          </View>
<View style={styles.option}>
  <Text style={styles.text}>Dark/Light theme:</Text>
          <CustomSwitch
            isOn={isDark}
            onToggle={toggleTheme}
            onIcon={"weather-night"}
            offIcon={"weather-sunny"}
          /></View>
        </View></BoxGradient>
        <Pressable
          style={styles.toggleButton}
          title={isDark ? "Light theme" : "Dark theme"}
          onPress={toggleTheme}
        >
          {isDark ? (
            <Text style={styles.text}>Toggle light mode:</Text>
          ) : (
            <Text style={styles.text}>Toggle dark mode:</Text>
          )}
          <MaterialCommunityIcons
            name={isDark ? "white-balance-sunny" : "weather-night"}
            color={theme.themeButton}
            size={50}
          />
        </Pressable>
      </ContainerGradient>
    </Background>
  );
};

export default Settings;

const createStyles = (theme) =>
  StyleSheet.create({
    toggleOption: {
      flex: 1,
      alignItems: "center",
    },
    toggleButton: {
      alignItems: "center",
    },
    text: {
      color: theme.textPrimary,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      padding: 10
    }
  });
