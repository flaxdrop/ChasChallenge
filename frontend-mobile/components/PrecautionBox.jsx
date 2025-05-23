import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrecautionBox = () => (
  <View style={styles.precautionBox}>
    <Text style={styles.precautionTitle}>PRECAUTION:</Text>
    <Text style={styles.precautionText}>None: Everyone enjoy{"\n"}outdoor activities</Text>
  </View>
);

const styles = StyleSheet.create({
  precautionBox: {
    borderRadius: 30,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "rgba(0, 186, 255, 0.1)",
  },
  precautionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  precautionText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PrecautionBox;
