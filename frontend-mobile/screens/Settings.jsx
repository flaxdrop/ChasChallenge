import { StyleSheet, Pressable, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";
import CustomSwitch from "../components/CustomSwitch";

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
  }

  // showNotification - asynkron funktion

  // Fallback för webbläge

  // Fallback för simulator/emulator

  // Kolla tillstånd för notiser - hårdkodat tillstånd

  // Om tillstånd saknas - be om tillstånd

  // Om tillstånd saknas - skicka varning

  // Schemalägga en notis

  return (
    <Background>
      <ContainerGradient>
        <View>
          <CustomSwitch isOn={isEnabled} onToggle={toggleSwitch}/>
          {/* <Switch
          trackColor={isEnabled ? "red" : "blue"}
          thumbColor={isEnabled ? "blue" : "red"}
          ios_backgroundColor={"#FFF"}
          value={isEnabled}
          onValueChange={toggleSwitch}
          /> */}

        </View>
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
