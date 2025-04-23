import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContainerGradient from './ContainerGradient'
import { useTheme } from '../theme/ThemeContext'
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TemperatureSmall = () => {
      const { theme } = useTheme();
      const styles = createStyles(theme);
  return (
    <ContainerGradient>
    <View>
      <View style={styles.headerSmall}>
        <Text style={styles.headerTextSmall}>Temperature</Text>
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          style={styles.infoIconSmall}
        />
      </View>
      <Text style={styles.text}>Information about temperature</Text>
    </View>
  </ContainerGradient>
  )
}

export default TemperatureSmall

const createStyles = (theme) => StyleSheet.create({
    headerSmall: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
      },
      headerTextSmall: {
        fontSize: 12,
        fontWeight: 400,
        padding: 3
      },
      infoIconSmall: {
          color: theme.infoIcon,
          padding: 3,
      },
      text: {
        color: theme.textPrimary,
      }
})