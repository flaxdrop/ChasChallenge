import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '../theme/ThemeContext'

const Background = ({ children }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
  return (
        <LinearGradient
          colors={[theme.backgroundPrimary, theme.backgroundSecondary]}
          style={styles.background}
          importantForAccessibility='no'
        >{children}
            </LinearGradient>
  )
}

export default Background

const createStyles = (theme) => StyleSheet.create({
    background: {
        flex: 1
      }
})