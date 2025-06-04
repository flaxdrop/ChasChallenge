import React from "react";
import { useTheme } from "../theme/ThemeContext";
import { View, Text, StyleSheet } from "react-native";

const PrecautionBox = ({ color, range, text, showInstruction }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      style={styles.box}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={
        showInstruction
          ? "Instructions. Press power button to analyze AQI. Press AQI color value for precautions. Scroll right for AQI historical data."
          : `Precaution. AQI value ${range}. ${text}`
      }
    >
      {showInstruction ? (
        <>
          <Text style={styles.precautionTitle}>
            <Text style={styles.airText}>AIR</Text>
            <Text style={styles.awareText}>AWARE</Text>
          </Text>
          <Text style={styles.infoText}>
            {'\u2022'} Press power button to [Analyze AQI]{'\n'}
            {'\u2022'} Press AQI color value for [Precautions]{'\n'}
            {'\u2022'} Scroll right for [AQI Historical Data]
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
      height: 180,
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
      fontSize: 18,
      marginBottom: 5,
      textShadowColor: "#000000",
      textShadowOffset: { width: 0.8, height: 0.8 },
      textShadowRadius: 1.5,
      paddingHorizontal: 50,
      paddingVertical: 5,
      textTransform: 'uppercase',
    },
    infoText:{
      lineHeight: 30,
      color: theme.textPrimary,
      textAlign: "center",
      fontStyle: "italic",
      fontSize: 17,
      fontWeight: "700",
      marginTop: 4,
    },
    text: {
      color: theme.textPrimary,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "700",
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
