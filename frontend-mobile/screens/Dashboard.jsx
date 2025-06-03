import React from "react";
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Animated.View
          style={{
            opacity: fadeAnims[3],
            transform: [{ translateY: translateYAnims[0] }],
          }}
          accessible={true}
          accessibilityLabel="Air quality indicator"
          accessibilityHint="Shows the current air quality index level"
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
          accessible={true}
          accessibilityLabel="Main control button"
          accessibilityHint="Use to turn the air quality analysis on or off"
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

        <PaginationDots
          slideIndex={slideIndex}
          accessible={true}
          accessibilityLabel="Pagination dots"
          accessibilityHint="Indicates which slide is currently active"
        />

        <Animated.View
          style={{
            opacity: fadeAnims[1],
            transform: [{ translateY: translateYAnims[2] }],
          }}
          accessible={true}
          accessibilityLabel="Sensor information section"
          accessibilityHint="Displays sensor data for temperature, humidity and air pressure"
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
    </LinearGradient>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === 'android' ? 25 : 60,  
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
    gradientBackground: {
      flex: 1,
    },
  });

export default Dashboard;
