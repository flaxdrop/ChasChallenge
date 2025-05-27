import React, { useEffect, useRef } from "react";
import {
  Animated,
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
    fadeAnims,
    translateYAnims,
  } = useDashboardLogic(process.env.EXPO_PUBLIC_RENDER_URL);

  const { range, color, text } = getPrecautionText();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={{
          opacity: fadeAnims[3],
          transform: [{ translateY: translateYAnims[0] }],
        }}
      >
        <AqiBar
          isOn={isOn}
          selectedAqi={selectedAqi}
          setSelectedAqi={setSelectedAqi}
          aqiValue={aqiValue}
          loadingData={loadingData}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnims[0],
          transform: [{ translateY: translateYAnims[1] }],
        }}
      >
        <SlideContent
          slideIndex={slideIndex}
          isOn={isOn}
          togglePower={togglePower}
          range={range}
          color={color}
          text={text}
          showInstruction={showInstruction}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnims[1],
          transform: [{ translateY: translateYAnims[2] }],
        }}
      >
        <SlideControls
          slideIndex={slideIndex}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnims[2],
          transform: [{ translateY: translateYAnims[3] }],
        }}
      >
        <SensorInfoCircles
          isOn={isOn}
          loadingData={loadingData}
          sensorData={sensorData}
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
        />
      </Animated.View>
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
