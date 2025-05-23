import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PowerButton = ({ isOn, onToggle }) => (
  <View style={styles.circleWrapper}>
    <View style={styles.circleShadow}>
      <Pressable onPress={onToggle} style={styles.circleButton}>
        <MaterialCommunityIcons
          name="power"
          size={60}
          color={isOn ? "#00FF1A" : "#FF0000"}
        />
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  circleWrapper: {
    alignItems: "center",
  },
  circleShadow: {
    shadowColor: "#00BAFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    borderRadius: 100,
  },
  circleButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PowerButton;
