import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { aqiDescriptions } from "../data/warningData"; //Warning label, advice and colors

const CurrentAQI = ({ title }) => {
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentAQI, setCurrentAQI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [warningColor, setWarningColor] = useState("");

  const aqiInfo = aqiDescriptions[currentAQI] || {
    warning: "unknown",
    advice: "no data",
    color: "black",
  };

  useEffect(() => {
    const fetchCurrentAQI = async () => {
      try {
        const response = await fetch(`${apiURL}/airquality/`);
        const json = await response.json();

        const data = json.map((item) => item.aqi);
        const lastIndex = data.length - 1;

        setCurrentAQI(data[lastIndex]);
      } catch (error) {
        console.error("Error getting current AQI value", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentAQI(); 
  }, []);

  useEffect(() => {
    if (currentAQI !== null) {
      const newColor = aqiDescriptions[currentAQI]?.color || "black";
      setWarningColor(newColor);
      console.log("New color: ", newColor);     
    }
  }, [currentAQI]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.elevation}>
      <LinearGradient
        style={styles.container}
        colors={[theme.graphFrom, theme.graphTo]}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.AQIValueContainer}>
          <Text style={styles.AQIValue}>
            {currentAQI}
          </Text>
          <Text style={[styles.AQIWarningText, { color: warningColor}]}>{aqiInfo.warning}</Text>
          <View style={styles.adviceContainer}>
          <Text style={styles.headerText}>Advice:</Text><Text style={styles.text}>{aqiInfo.advice}</Text>
        </View></View>
      </LinearGradient>
    </View>
  );
};

export default CurrentAQI;

const createStyles = (theme) =>
  StyleSheet.create({
    elevation: {
      elevation: 4,
      flex: 1,
      margin: 0,
      width: "100%",
    },
    container: {
      width: "100%",
      borderRadius: 10,
      marginVertical: 8,
      elevation: 4,
    },
    adviceContainer:{
      backgroundColor: theme.primary,
      elevation: 1,
      padding: 10,
      margin: 10,
      borderRadius: 10,
    },
    title: {
      color: theme.textPrimary,
      padding: 10,
      fontSize: 20,
      justifyContent: "center",
    },
    AQIValueContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 20,
    },
    AQIValue: {
      fontWeight: 800,
      fontSize: 70
    },
    AQIWarningText: {
      fontSize: 30,
      fontWeight: 600,
      color: theme.notification,
      padding: 10
    },
    headerText: {
      fontWeight: 600,
      textAlign: "center",
      fontSize: 20,
      color: theme.textPrimary
    },
    text: {
      color: theme.textPrimary,
      textAlign: "left",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      fontSize: 14
    },
  });
