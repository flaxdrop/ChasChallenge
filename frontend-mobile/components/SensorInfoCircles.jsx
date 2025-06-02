import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
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
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                isOn
                  ? `${item.label} sensor is inactive`
                  : `${item.label} value is ${
                      loadingData ? "loading" : sensorData[item.type] || "not available"
                    }. Press to ${
                      isSelected ? "deselect" : "view precautions"
                    }`
              }
            >
              <View style={styles.circleContainer}>
                <View style={styles.circleContent}>
                  {loadingData && showValue ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : showValue ? (
                    <>
                      <MaterialCommunityIcons
                        name={item.icon}
                        color={item.color}
                        size={52}
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
                      size={45}
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
      color: theme.textPrimary,
      marginBottom: 15,
      fontSize: 13.2,
      fontWeight: "900",
      textAlign: "center",
    },
    circleContainer: {
      width: 95,
      height: 95,
      borderRadius: 47.5,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      elevation: 20,
      borderRadius: 100,
      backgroundColor: theme.circleBackground,
      borderWidth: 4,
      borderColor: "#000000",
    },
    circleContent: {
      width: 90,
      height: 90,
      borderRadius: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    iconBackground: {
      position: "absolute",
      opacity: 0.4,
      zIndex: 0,
    },
    valueText: {
      color: "#fff",
      fontWeight: "900",
      fontSize: 19.2,
      zIndex: 1,
      textAlign: "center",
      paddingHorizontal: 6,
    },
  });

export default SensorInfoCircles;
