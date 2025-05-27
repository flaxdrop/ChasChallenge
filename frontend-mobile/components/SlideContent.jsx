import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import PowerButton from "./PowerButton";
import PrecautionBox from "./PrecautionBox";
import WeeklyAverageChart from "./WeeklyAverageChart";

const SlideContent = ({ slideIndex, isOn, togglePower, range, color, text, showInstruction, }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.slideContainer}>
      {slideIndex === 0 ? (
        <View style={styles.slideContent}>
          <PowerButton isOn={isOn} togglePower={togglePower} />
          <Text style={styles.powerStatusText}>
          {isOn ? "Powerbutton is OFF" : "Powerbutton is ON"}
          </Text>
          <PrecautionBox color={color} range={range} text={text} showInstruction={showInstruction} />
        </View>
      ) : (
        <View style={styles.slideContent}>
        <WeeklyAverageChart
          title="Weekly Average AQI"
          valuePath="measurements"
          value="aqi"
          limit={100}
        />
        </View>
      )}
    </View>
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
    powerStatusText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 800,
  },

  });

export default SlideContent;
