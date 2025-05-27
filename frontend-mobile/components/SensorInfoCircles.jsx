import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";
import dashboardData from "../data/dashboardData";

const { INFO_ITEMS } = dashboardData;

const Hexagon = () => (
  <Svg width={90} height={90} viewBox="0 0 90 90">
    <Polygon
      points="45,0 90,22.5 90,67.5 45,90 0,67.5 0,22.5"
      fill="rgba(217,217,217,0.1)"
      stroke="#000"
      strokeWidth="4"
    />
  </Svg>
);

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
            >
              <View style={styles.hexContainer}>
                <Hexagon />
                <View style={styles.hexContent}>
                  {loadingData && showValue ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : showValue ? (
                    <>
                      <MaterialCommunityIcons
                        name={item.icon}
                        color={item.color}
                        size={32}
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
                </View>
              </View>
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
      justifyContent: "space-around",
      gap: 12,
      flexWrap: "wrap",
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
      textAlign: "center",
    },
    hexContainer: {
      width: 95,
      height: 95,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    hexContent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#00BAFF",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 30,
      elevation: 20, 
    },
    iconBackground: {
      position: "absolute",
      opacity: 0.4,
      zIndex: 0,
    },
    valueText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 17,
      zIndex: 1,
      textAlign: "center",
      paddingHorizontal: 6,
    },
  });

export default SensorInfoCircles;
