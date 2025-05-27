import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrecautionBox = ({ color, range, text, showInstruction }) => {
  const styles = createStyles();

  return (
    <View style={[styles.box, { backgroundColor: "rgba(0, 186, 255, 0.1)" }]}>
      {showInstruction ? (
        <>
        <Text style={styles.precautionTitle}><Text style={{ color: '#00BAFF' }}>AIR</Text><Text style={{ color: '#00FF1A' }}>AWARE</Text></Text>
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
      width: "100%",
      height: 160,
      justifyContent: "center",
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "#00FF66",
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 8,
    },
    range: {
      fontWeight: "bold",
      fontSize: 17,
      marginBottom: 5,
    },
    text: {
      color: "#fff",
      textAlign: "center",
      fontSize: 17,
      fontWeight: "600",
      marginTop: 4,
      textAlign: "center",
    },
    precautionTitle:{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
      marginBottom: 8,
    }
});

export default PrecautionBox;
