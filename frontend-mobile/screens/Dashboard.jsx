import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
    showInstruction,
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
        showInstruction={showInstruction}
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
      backgroundColor: "#000711",
      paddingTop: 60,
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
  });

export default Dashboard;
