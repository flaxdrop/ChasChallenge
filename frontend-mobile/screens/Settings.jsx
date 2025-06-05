import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
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
  };

  return (
    <Background>
      <ContainerGradient>
        <BoxGradient>
          <View>
            <View style={styles.option}>
              <Text
                style={styles.text}
                accessible={false}
                importantForAccessibility="no"
              >
                Notifications:
              </Text>
              <CustomSwitch
                isOn={isEnabled}
                onToggle={toggleSwitch}
                onIcon={"bell"}
                offIcon={"bell-off"}
                accessibilityLabel="Notifications toggle"
                accessibilityHint="Turn notifications on or off"
              />
            </View>
            <View style={styles.option}>
              <Text
                style={styles.text}
                accessible={false}
                importantForAccessibility="no"
              >
                Dark/Light theme:
              </Text>
              <CustomSwitch
                isOn={isDark}
                onToggle={toggleTheme}
                onIcon={"weather-night"}
                offIcon={"weather-sunny"}
                accessibilityLabel="Theme toggle"
                accessibilityHint="Switch between dark and light theme"
              />
            </View>
          </View>
        </BoxGradient>
        {/* <Pressable
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
        </Pressable> */}
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
      padding: 10,
    },
  });
