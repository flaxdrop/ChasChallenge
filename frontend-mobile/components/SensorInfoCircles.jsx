import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dashboardData from "../data/dashboardData";

const { INFO_ITEMS } = dashboardData;


const SensorInfoCircles = ({
  isOn,
  loadingData,
  sensorData,
  selectedInfo,
  setSelectedInfo,
}) => {

  const styles = createStyles();

  return (
    <View style={styles.row}>
      {INFO_ITEMS.map((item) => {
        const showValue = !isOn;
        const isSelected = selectedInfo === item.type;

        return (
          <View key={item.type} style={styles.block}>
            <Text style={styles.label}>{item.label}</Text>
            <Pressable
              disabled={isOn}
              onPress={() => setSelectedInfo(isSelected ? null : item.type)}
              style={styles.circle}
            >
              {loadingData && showValue ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : showValue ? (
                <>
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={item.color}
                    size={42}
                    style={styles.iconBackground}
                  />
                  <Text style={styles.valueText}>
                    {sensorData[item.type] || "N/A"}
                  </Text>
                </>
              ) : (
                <MaterialCommunityIcons
                  name={item.icon}
                  color={item.color}
                  size={42}
                />
              )}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    block: {
      alignItems: "center",
      width: 90,
    },
    label: {
      color: "#fff",
      marginBottom: 15,
      fontSize: 14,
      fontWeight: "600",
    },
    circle: {
      width: 85,
      height: 85,
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
    iconBackground: {
      position: "absolute",
      opacity: 0.4,
      zIndex: 0,
    },
    valueText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      zIndex: 1,
      textAlign:"center",
    },
});

export default SensorInfoCircles;
