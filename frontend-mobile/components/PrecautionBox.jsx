import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrecautionBox = ({ color, range, text }) => {
  const styles = createStyles();

  return (
    <View style={[styles.box, { backgroundColor: "rgba(0, 186, 255, 0.1)" }]}>
      <Text style={styles.title}>PRECAUTION:</Text>
      <Text style={[styles.range, { color }]}>{range}</Text>
      <Text style={styles.text}>{text}</Text>
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
      marginBottom: 2,
    },
    range: {
      fontWeight: "bold",
      fontSize: 16,
    },
    text: {
      color: "#fff",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
      marginTop: 4,
    },
});

export default PrecautionBox;
