import { StyleSheet, Pressable, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../theme/ThemeContext'
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Settings = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={styles.toggleOption}>
    <Pressable
    title={isDark? "Light theme" : "Dark theme"}
    onPress={toggleTheme}
    >{isDark? <Text>Toggle light mode</Text> : <Text>Toggle dark mode</Text>}
      <MaterialCommunityIcons
      name={isDark? "white-balance-sunny" : "weather-night"}
      color={theme.themeButton}
      size={30}/>
    </Pressable></View>
  )
}

export default Settings

const styles = StyleSheet.create({
  toggleOption: {
    flex: "row",
    justifyContent: "center",
    alignSelf: "center"
  },
  alignCenter: {
    alignSelf: "center"
  }
})