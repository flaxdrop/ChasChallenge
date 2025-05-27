import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

const SlideControls = ({ slideIndex, nextSlide, prevSlide }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.slideBox}>
      <Pressable onPress={prevSlide}>
        <MaterialCommunityIcons name="chevron-left" color="#000" size={28} />
      </Pressable>
      <Text style={styles.slideText}>
        {slideIndex === 0 ? "ANALYZE AQI" : "HISTORICAL GRAPH"}
      </Text>
      <Pressable onPress={nextSlide}>
        <MaterialCommunityIcons name="chevron-right" color="#000" size={28} />
      </Pressable>
    </View>
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
      backgroundColor: "#5DD3FF", 
    },
    slideText: {
      color: "#000",
      fontWeight: "bold",
      fontSize: 18,
    },
  });

export default SlideControls;
