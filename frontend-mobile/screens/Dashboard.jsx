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
import { useTheme } from "../theme/ThemeContext";
import useDashboardLogic from "../hooks/useDashboardLogic";
import AqiBar from "../components/AqiBar";
import SlideContent from "../components/SlideContent";
import SlideControls from "../components/SlideControls";
import SensorInfoCircles from "../components/SensorInfoCircles";

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
      <AqiBar
        isOn={isOn}
        selectedAqi={selectedAqi}
        setSelectedAqi={setSelectedAqi}
        aqiValue={aqiValue}
        loadingData={loadingData}
      />

      {/* SLIDE CONTENT */}
      <SlideContent
        slideIndex={slideIndex}
        isOn={isOn}
        togglePower={togglePower}
        range={range}
        color={color}
        text={text}
      />

      {/* SLIDE CONTROLS */}
      <SlideControls
        slideIndex={slideIndex}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />

      {/* SENSOR INFO CIRCLES */}
      <SensorInfoCircles
        isOn={isOn}
        loadingData={loadingData}
        sensorData={sensorData}
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
      />

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
