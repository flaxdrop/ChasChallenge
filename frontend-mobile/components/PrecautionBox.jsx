import React from "react";
import { useTheme } from "../theme/ThemeContext";
import { View, Text, StyleSheet } from "react-native";

const PrecautionBox = ({ color, range, text, showInstruction }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.box}>
      {showInstruction ? (
        <>
          <Text style={styles.precautionTitle}>
            <Text style={styles.airText}>AIR</Text>
            <Text style={styles.awareText}>AWARE</Text>
          </Text>
          <Text style={styles.text}>
            Press power button to analyze AQI{'\n'}
            OR{'\n'}
            Press AQI color value for precautions  
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>PRECAUTION:</Text>
          <Text style={[styles.range, { color }]}>AQI Value: {range}</Text>
          <Text style={styles.text}>{text}</Text>
        </>
      )}
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    box: {
      borderRadius: 30,
      padding: 15,
      marginTop: 20,
      alignItems: "center",
      width: "105%",
      height: 170,
      justifyContent: "center",
      backgroundColor: theme.textBox,
    },
    title: {
      color: theme.textPrimary,
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 8,
    },
    range: {
      fontWeight: 900,
      fontSize: 17,
      marginBottom: 5,
      textShadowColor: "black",
      textShadowOffset: { width: 0.8, height: 0.8 },
      textShadowRadius: 1.5,
      paddingHorizontal: 50,
      paddingVertical: 5,
      textTransform: 'uppercase',
    },
    text: {
      color: theme.textPrimary,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "600",
      marginTop: 4,
    },
    precautionTitle: {
      fontWeight: "900",
      fontSize: 30,
      marginBottom: 8,
    },
    airText: {
      color: theme.textAccentPrimary,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      paddingHorizontal: 50,
      paddingVertical: 5,
      textTransform: 'uppercase',
      fontWeight: "900",
    },
    awareText: {
      color: theme.textAccentSecondary,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      paddingHorizontal: 50,
      paddingVertical: 5,
      textTransform: 'uppercase',
      fontWeight: "900",
    },
  });

export default PrecautionBox;
