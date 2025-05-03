import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const CurrentAQI = ({ title }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentAQI, setCurrentAQI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastValue, setLastValue] = useState(null);

  const aqiDescriptions = {
    1: { warning: "Good", advice: "no problemo" },
    2: { warning: "Moderate", advice: "no problemo" },
    3: {
      warning: "Unhealthy for sensitive groups",
      advice: "Go inside if you blablabla",
    },
    4: { warning: "Unhealthy", advice: "Yes problemo" },
    5: { warning: "Hazardous", advice: "Go inside and chill" },
  };

  const aqiInfo = aqiDescriptions[lastValue] || {
    warning: "unknown",
    advice: "no data",
  };

  useEffect(() => {
    const fetchCurrentAQI = async () => {
      try {
        const response = await fetch("http://213.238.214.246:3000/airquality/");
        const json = await response.json();
        // console.log("CURRENT AQI:", json);

        const data = json.map((item) => item.aqi);
        const lastIndex = data.length - 1;
        setLastValue(data[lastIndex]);
        setCurrentAQI(data[lastIndex]);
      } catch (error) {
        console.error("Error getting current AQI value", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentAQI();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.elevation}>
      <LinearGradient
        style={styles.container}
        colors={[theme.graphFrom, theme.graphTo]}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.AQIValueContainer}>
        <Text style={styles.AQIValue}>{currentAQI}</Text>
        <Text style={styles.AQIWarningText}>{aqiInfo.warning}</Text>
          <Text style={styles.text}>Advice: {aqiInfo.advice}</Text></View>
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
    title: {
      color: theme.textPrimary,
      padding: 10,
      justifyContent: "center",
      textAlign: "center",
    },
    AQIValueContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
      },
    AQIValue: {
        color: theme.textAccent,
        fontWeight: 800,
        fontSize: 64,
      },
      AQIWarningText: {
        fontSize: 30,
        fontWeight: 600,
        color: theme.notification,
      },
      text: {
        color: theme.textPrimary
      }
  });
