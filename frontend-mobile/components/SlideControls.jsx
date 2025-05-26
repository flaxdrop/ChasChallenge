import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

const SlideControls = ({ slideIndex, nextSlide, prevSlide }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
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
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
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
  });

export default SlideControls;
