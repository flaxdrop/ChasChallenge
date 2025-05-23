import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import useDashboardLogic from "../hooks/useDashboardLogic";
import dashboardData from "../data/dashboardData";
import getAqiLevelIndex from "../utils/aqiUtils";

const { AQI_LEVELS, AQI_LABELS, INFO_ITEMS } = dashboardData;

const Dashboard = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const {
    isOn,
    selectedAqi,
    selectedInfo,
    slideIndex,
    sensorData,
    loadingData,
    aqiValue,
    togglePower,
    getPrecautionText,
    nextSlide,
    prevSlide,
    setSelectedAqi,
    setSelectedInfo,
  } = useDashboardLogic(process.env.EXPO_PUBLIC_RENDER_URL);

  const { range, color, text } = getPrecautionText();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* AQI BAR */}
      <View style={styles.aqiBar}>
        <View style={styles.aqiLevelContainer}>
          {isOn ? (
            AQI_LEVELS.map((level, index) => (
              <Pressable
                key={index}
                style={[
                  styles.aqiLevel,
                  { backgroundColor: level.color },
                  selectedAqi === index && { borderWidth: 2, borderColor: "#fff" },
                ]}
                onPress={() => setSelectedAqi(index === selectedAqi ? null : index)}
              />
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
              <Text style={styles.aqiText}>
                {AQI_LABELS[getAqiLevelIndex(aqiValue)]}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* SLIDE CONTENT */}
      <View style={styles.slideContainer}>
        {slideIndex === 0 ? (
          <View style={styles.slideContent}>
            {/* POWER BUTTON */}
            <View style={styles.circleWrapper}>
              <View style={styles.circleShadow}>
                <Pressable onPress={togglePower} style={styles.circleButton}>
                  <MaterialCommunityIcons
                    name="power"
                    size={60}
                    color={isOn ? "#00FF1A" : "#FF0000"}
                  />
                </Pressable>
              </View>
            </View>

            {/* PRECAUTION BOX */}
            <View style={[styles.box, { backgroundColor: "rgba(0, 186, 255, 0.1)" }]}>
              <Text style={styles.title}>PRECAUTION:</Text>
              <Text style={[styles.range, { color }]}>{range}</Text>
              <Text style={styles.precautionText}>{text}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.slideContent}>
            <View style={styles.emptySlide}>
              <Text style={styles.historicalText}>Historical Graph will go here.</Text>
            </View>
          </View>
        )}
      </View>

      {/* SLIDE CONTROLS */}
      <LinearGradient
        colors={["#001BA3", "#00BAFF"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.slideBox}
      >
        <Pressable onPress={prevSlide}>
          <MaterialCommunityIcons name="chevron-left" color="#fff" size={28} />
        </Pressable>
        <Text style={styles.slideText}>
          {slideIndex === 0 ? "ANALYZE AQI" : "HISTORICAL GRAPH"}
        </Text>
        <Pressable onPress={nextSlide}>
          <MaterialCommunityIcons name="chevron-right" color="#fff" size={28} />
        </Pressable>
      </LinearGradient>

      {/* SENSOR INFO CIRCLES */}
      <View style={styles.sensorRow}>
        {INFO_ITEMS.map((item) => {
          const showValue = !isOn;
          const isSelected = selectedInfo === item.type;

          return (
            <View key={item.type} style={styles.sensorBlock}>
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
                    size={32}
                  />
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: 60,
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
    aqiBar: {
      alignItems: "center",
      marginBottom: 20,
    },
    aqiLevelContainer: {
      flexDirection: "row",
      borderRadius: 40,
      overflow: "hidden",
      width: "100%",
      height: 30,
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
      fontSize: 12,
    },
    aqiText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 12,
    },
    slideContainer: {
      height: 280,
      alignItems: "center",
      justifyContent: "center",
    },
    slideContent: {
      width: "100%",
      alignItems: "center",
    },
    emptySlide: {
      padding: 40,
    },
    historicalText: {
      color: "#fff",
      fontSize: 16,
    },
    circleWrapper: {
      alignItems: "center",
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
    box: {
      borderRadius: 30,
      padding: 15,
      marginTop: 10,
      alignItems: "center",
      width: "100%",
      height: 120,
      justifyContent: "center",
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 2,
    },
    range: {
      fontWeight: "bold",
      fontSize: 16,
    },
    precautionText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 14,
      fontWeight: "600",
      marginTop: 4,
    },
    slideBox: {
      flexDirection: "row",
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    slideText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18,
    },
    sensorRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    sensorBlock: {
      alignItems: "center",
      width: 90,
    },
    label: {
      color: "#fff",
      marginBottom: 8,
      fontSize: 13,
      fontWeight: "600",
    },
    circle: {
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
    iconBackground: {
      position: "absolute",
      opacity: 0.2,
      zIndex: 0,
    },
    valueText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      zIndex: 1,
    },
  });

export default Dashboard;
