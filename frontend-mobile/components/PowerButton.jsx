import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PowerButton = ({ isOn, togglePower }) => {
  const styles = createStyles(); 

  return (
    <View style={styles.circleWrapper}>
      <View style={styles.circleShadow}>
        <Pressable 
          onPress={togglePower} 
          style={styles.circleButton}
          >
          <MaterialCommunityIcons
            name="power"
            size={60}
            color={isOn ? "#00FF1A" : "#FF0000"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    circleWrapper: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(217, 217, 217, 0.1)",
      borderColor: "#000",
    },
  });

export default PowerButton;
