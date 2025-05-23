import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AqiSlideshowHeader = () => (
  <View style={styles.slideBox}>
    <MaterialCommunityIcons name="chevron-left" color="#fff" size={28} />
    <Text style={styles.slideText}>ANALYZE AQI</Text>
    <MaterialCommunityIcons name="chevron-right" color="#fff" size={28} />
  </View>
);

const styles = StyleSheet.create({
  slideBox: {
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  slideText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AqiSlideshowHeader;
