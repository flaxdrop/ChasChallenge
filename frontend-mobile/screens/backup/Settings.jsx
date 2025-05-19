import { StyleSheet, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";

const Settings = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Background>
      <ContainerGradient>
        <View style={styles.toggleOption}>
          <Pressable style={styles.toggleButton}
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



        </View>
      </ContainerGradient>
    </Background>
  );
};

export default Settings;

const createStyles = (theme) => StyleSheet.create({
  toggleOption: {
    flex: 1,
    alignItems: "center"
  },
  toggleButton: {
    alignItems: "center",
  },
  text: {
    color: theme.textPrimary
  }
});
