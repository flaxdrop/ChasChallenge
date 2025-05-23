import React from "react";
import { View, StyleSheet } from "react-native";

const AqiBar = () => (
  <View style={styles.aqiBar}>
    <View style={styles.aqiLevelContainer}>
      <View style={[styles.aqiLevel, { backgroundColor: "#00E400" }]} />
      <View style={[styles.aqiLevel, { backgroundColor: "#FFFF00" }]} />
      <View style={[styles.aqiLevel, { backgroundColor: "#FF7E00" }]} />
      <View style={[styles.aqiLevel, { backgroundColor: "#FF0000" }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  aqiBar: {
    alignItems: "center",
    marginBottom: 20,
  },
  aqiLevelContainer: {
    flexDirection: "row",
    borderRadius: 40,
    overflow: "hidden",
    width: "70%",
    height: 30,
  },
  aqiLevel: {
    flex: 1,
  },
});

export default AqiBar;
