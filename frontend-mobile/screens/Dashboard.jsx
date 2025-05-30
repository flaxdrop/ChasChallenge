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
import PaginationDots from "../components/PaginationDots";
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
    setSelectedAqi,
    setSelectedInfo,
    showInstruction,
    fadeAnims,
    translateYAnims,
    handleSwipe,
    slideAnim,
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
          transform: [
            { translateY: translateYAnims[1] },
            { translateX: slideAnim },
          ],
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
          handleSwipe={handleSwipe}
          slideAnim={slideAnim}
        />
      </Animated.View>

      <PaginationDots slideIndex={slideIndex} />

      <Animated.View
        style={{
          opacity: fadeAnims[1],
          transform: [{ translateY: translateYAnims[2] }],
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
