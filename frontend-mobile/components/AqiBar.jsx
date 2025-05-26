import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import data from "../data/dashboardData";
import getAqiLevelIndex from "../utils/aqiUtils";

const { AQI_LEVELS, AQI_LABELS } = data;

const AqiBar = ({ isOn, selectedAqi, setSelectedAqi, aqiValue, loadingData }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.aqiBar}>
      <Text style={styles.title}>AQI</Text>
      <View style={styles.aqiLevelContainer}>
        {isOn ? (
          AQI_LEVELS.map((level, index) => (
            <Pressable
              key={index}
              style={[
                styles.aqiLevel,
                { backgroundColor: level.color },
                selectedAqi === index && { borderWidth: 2, borderColor: "#fff" },
                styles.centered,
              ]}
              onPress={() => setSelectedAqi(index === selectedAqi ? null : index)}
            >
              <Text style={styles.rangeText}>{level.range}</Text>
            </Pressable>
          ))
        ) : loadingData ? (
          <View style={[styles.aqiLevel, styles.centered]}>
            <Text style={styles.loadingText}>Loading AQI</Text>
          </View>
        ) : aqiValue !== null ? (
          <View
            style={[
              styles.aqiLevel,
              { backgroundColor: AQI_LEVELS[getAqiLevelIndex(aqiValue)].color },
              styles.centered,
            ]}
          >
            <Text style={styles.aqiText}>{AQI_LABELS[getAqiLevelIndex(aqiValue)]}</Text>
          </View>
        ) : null}

      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    aqiBar: {
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 25,
      marginBottom: 15,
    },
    aqiLevelContainer: {
      flexDirection: "row",
      borderRadius: 40,
      overflow: "hidden",
      width: "85%",
      height: 40,
    },
    aqiLevel: {
      flex: 1,
    },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
    },
    aqiText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 30,
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 0,
    },
    rangeText: {
    color: "#000000",
    fontWeight: 900,
    fontSize: 10,
    textAlign: "center",
  },

  });

export default AqiBar;
