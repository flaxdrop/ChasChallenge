import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SensorInfoCircles = ({ isOn }) => (
  <View style={styles.iconRow}>
    {isOn ? (
      <>
        <Circle icon="thermometer" color="#FF3B30" />
        <Circle icon="cloud" color="#00FF1A" />
        <Circle icon="water-percent" color="#00BAFF" />
      </>
    ) : (
      <>
        <Circle text="21°" />
        <Circle text="CO₂: 460" />
        <Circle text="48%" />
      </>
    )}
  </View>
);

const Circle = ({ icon, color, text }) => (
  <View style={styles.infoCircle}>
    {icon ? (
      <MaterialCommunityIcons name={icon} color={color} size={32} />
    ) : (
      <Text style={styles.valueText}>{text}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(217,217,217,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#000",
    shadowColor: "#00BAFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  valueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SensorInfoCircles;
