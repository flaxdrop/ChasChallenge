import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContainerGradient from "./ContainerGradient";


const AqiDisplay = ({ title }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [lastAQIValue, setLastAQIValue] = useState();

  const fetchAQI = async () => {

    try {
      const response = await fetch('http://192.168.1.53:3000/airquality/3');
        if (!response.ok) throw new Error("Something went wrong while fetching AQI values");
        const data = await response.json();
        // console.log(data);
        setLastAQIValue(data.aqi);
        return data;

    } catch (error) {
        console.error("Couldn't fetch AQI values");
        return null;        
    }
  }

  useEffect(() => {
    fetchAQI();
  }, [])
 
  

  return (
    <>
      <ContainerGradient>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <MaterialCommunityIcons
            name="information-outline"
            size={30}
            style={styles.infoIcon}
          />
          
        </View>
        <View style={styles.AQIValueContainer}>
          <Text style={styles.AQIValue}>{lastAQIValue ? JSON.stringify(lastAQIValue) : "Loading..."}</Text>
          <Text style={styles.AQIWarningText}>Hazardous</Text>
          <View style={styles.adviceText}>
          <Text style={styles.text}>Sensitive groups: Avoid all outdoor physical activities</Text>
          <Text style={styles.text}>Everyone: Significantly cut back on outdoor physical activities</Text></View>
        </View>
      </ContainerGradient>
     
   
    </>
  );
};

export default AqiDisplay;

const createStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    headerText: {
      color: theme.accent,
      fontSize: 24,
      position: "absolute",
      textAlign: "center",
      left: 0,
      right: 0,
      fontWeight: "500",
    },
    infoIcon: {
      color: theme.infoIcon,
      padding: 10,
    },
    AQIValueContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
        color: theme.textPrimary,
      }
  });
