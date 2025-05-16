import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { useTheme } from '../theme/ThemeContext'

const BoxGradient = ({children}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
  return (
    <LinearGradient
            style={styles.container}
            colors={[theme.graphFrom, theme.graphTo]}
          >{children}
            </LinearGradient>
  )
}

export default BoxGradient

const createStyles = (theme) => StyleSheet.create({
    container: {
      width: "100%",
      borderRadius: 10,
      marginVertical: 8,
      elevation: 4,
    },
})