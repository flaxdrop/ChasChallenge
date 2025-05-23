import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import PowerButton from "./PowerButton";
import PrecautionBox from "./PrecautionBox";

const SlideContent = ({ slideIndex, isOn, togglePower, range, color, text }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.slideContainer}>
      {slideIndex === 0 ? (
        <View style={styles.slideContent}>
          <PowerButton isOn={isOn} togglePower={togglePower} />
          <PrecautionBox color={color} range={range} text={text} />
        </View>
      ) : (
        <View style={styles.slideContent}>
          <View style={styles.emptySlide}>
            <Text style={styles.historicalText}>Historical Graph will go here.</Text>
          </View>
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
  });

export default SlideContent;
