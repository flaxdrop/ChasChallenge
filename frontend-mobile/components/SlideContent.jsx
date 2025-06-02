import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import PowerButton from "./PowerButton";
import PrecautionBox from "./PrecautionBox";
import WeeklyAverageChart from "./WeeklyAverageChart";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const SlideContent = ({
  slideIndex,
  isOn,
  togglePower,
  range,
  color,
  text,
  showInstruction,
  handleSwipe,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <PanGestureHandler
      onEnded={handleSwipe}
      accessible={true}
      accessibilityLabel="Swipe to change between power control and historical data"
    >
      <View style={styles.slideContainer}>
        {slideIndex === 0 ? (
          <View style={styles.slideContent}>
            <PowerButton isOn={isOn} togglePower={togglePower} />
            <Text
              style={styles.powerStatusText}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`Power button is currently ${isOn ? "off" : "on"}`}
            >
              {isOn ? "Powerbutton is OFF" : "Powerbutton is ON"}
            </Text>
            <PrecautionBox
              color={color}
              range={range}
              text={text}
              showInstruction={showInstruction}
            />
          </View>
        ) : (
          <View style={styles.slideContent}>
            <WeeklyAverageChart
              title="AQI Historical Data"
              valuePath="measurements"
              value="aqi"
              limit={100}
            />
          </View>
        )}
      </View>
    </PanGestureHandler>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    slideContainer: {
      height: 280,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      marginBottom: 50,
    },
    slideContent: {
      width: width - 40,
      alignItems: "center",
    },
    powerStatusText: {
      color: theme.textPrimary,
      fontSize: 18,
      fontWeight: "800",
    },
  });

export default SlideContent;
