import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import data from "../data/dashboardData";

const { width } = Dimensions.get("window");

const { AQI_LEVELS, AQI_LABELS, INFO_ITEMS } = data;

const getAqiLevelIndex = (aqi) => {
  if (aqi <= 50) return 0;
  if (aqi <= 100) return 1;
  if (aqi <= 150) return 2;
  if (aqi <= 200) return 3;
  if (aqi <= 300) return 4;
  return 5;
};

const getAqiLabel = (index) => AQI_LABELS[index];

const Dashboard = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [isOn, setIsOn] = useState(true);
  const [selectedAqi, setSelectedAqi] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    pressure: null,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [aqiValue, setAqiValue] = useState(null);

  const apiURL = process.env.EXPO_PUBLIC_RENDER_URL;

  useEffect(() => {
    if (!isOn) {
      fetchSensorData();
    }
  }, [isOn]);

  const fetchSensorData = async () => {
    try {
      setLoadingData(true);

      const [tempRes, humRes, presRes, aqiRes] = await Promise.all([
        fetch(`${apiURL}/measurements/temperature`),
        fetch(`${apiURL}/measurements/humidity`),
        fetch(`${apiURL}/measurements/pressure`),
        fetch(`${apiURL}/measurements/aqi`),
      ]);

      const tempData = await tempRes.json();
      const humData = await humRes.json();
      const presData = await presRes.json();
      const aqiData = await aqiRes.json();

      setAqiValue(aqiData[0]?.aqi ?? null);

      setSensorData({
        temperature: tempData[0]?.temperature?.toFixed(1) + "°C" || "N/A",
        humidity: humData[0]?.humidity?.toFixed(1) + "%" || "N/A",
        pressure: presData[0]?.pressure?.toFixed(1) + " Pa" || "N/A",
      });
    } catch (error) {
      console.log("Failed to fetch sensor data", error);
    } finally {
      setLoadingData(false);
    }
  };

  const togglePower = () => {
    setIsOn(!isOn);
    setSelectedAqi(null);
    setSelectedInfo(null);
  };

  const getPrecautionText = () => {
    if (selectedAqi !== null) return AQI_LEVELS[selectedAqi];
    if (!isOn && aqiValue !== null) return AQI_LEVELS[getAqiLevelIndex(aqiValue)];
    return { range: "None", color: "#fff", text: "Everyone enjoy\noutdoor activities" };
  };

  const nextSlide = () => setSlideIndex((slideIndex + 1) % 2);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + 2) % 2);

  const { range, color, text } = getPrecautionText();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* AQI BAR */}
      <View style={styles.aqiBar}>
        <View style={styles.aqiLevelContainer}>
          {isOn ? (
            AQI_LEVELS.map((level, index) => (
              <Pressable
                key={index}
                style={[
                  styles.aqiLevel,
                  { backgroundColor: level.color },
                  selectedAqi === index && { borderWidth: 2, borderColor: "#fff" },
                ]}
                onPress={() => setSelectedAqi(index === selectedAqi ? null : index)}
              />
            ))
          ) : loadingData ? (
            <View style={[styles.aqiLevel, styles.centered]}>
              <Text style={styles.loadingText}>Loading AQI</Text>
            </View>
          ) : aqiValue !== null ? (
            <View style={[styles.aqiLevel, { backgroundColor: AQI_LEVELS[getAqiLevelIndex(aqiValue)].color }, styles.centered]}>
              <Text style={styles.aqiText}>{getAqiLabel(getAqiLevelIndex(aqiValue))}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* SLIDE CONTENT */}
      <View style={styles.slideContainer}>
        {slideIndex === 0 ? (
          <View style={styles.slideContent}>
            {/* Inlined PowerButton */}
            <View style={styles.circleWrapper}>
              <View style={styles.circleShadow}>
                <Pressable
                  onPress={togglePower}
                  style={styles.circleButton}
                >
                  <MaterialCommunityIcons
                    name="power"
                    size={60}
                    color={isOn ? "#00FF1A" : "#FF0000"}
                  />
                </Pressable>
              </View>
            </View>

            {/* Inlined PrecautionBox */}
            <View style={[styles.precautionBox, { backgroundColor: "rgba(0, 186, 255, 0.1)" }]}>
              <Text style={styles.precautionTitle}>PRECAUTION:</Text>
              <Text style={[styles.precautionRange, { color }]}>{range}</Text>
              <Text style={styles.precautionText}>{text}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.slideContent}>
            <View style={styles.emptySlide}>
              <Text style={styles.historicalText}>Historical Graph will go here.</Text>
            </View>
          </View>
        )}
      </View>

      {/* SLIDE CONTROLS */}
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

      {/* Inlined SensorInfoCircles */}
      <View style={styles.iconRow}>
        {INFO_ITEMS.map((item) => {
          const showValue = !isOn;
          const isSelected = selectedInfo === item.type;

          return (
            <View key={item.type} style={styles.infoBlock}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Pressable
                disabled={isOn}
                onPress={() => setSelectedInfo(isSelected ? null : item.type)}
                style={styles.infoCircle}
              >
                {loadingData && showValue ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : showValue ? (
                  <>
                    <MaterialCommunityIcons
                      name={item.icon}
                      color={item.color}
                      size={32}
                      style={styles.iconBackground}
                    />
                    <Text style={styles.valueText}>
                      {sensorData[item.type] || "N/A"}
                    </Text>
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={item.color}
                    size={32}
                  />
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: 60,
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
    aqiBar: {
      alignItems: "center",
      marginBottom: 20,
    },
    aqiLevelContainer: {
      flexDirection: "row",
      borderRadius: 40,
      overflow: "hidden",
      width: "100%",
      height: 30,
    },
    aqiLevel: {
      flex: 1,
    },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
    },
    aqiText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 12,
    },
    slideContainer: {
      height: 280,
      alignItems: "center",
      justifyContent: "center",
    },
    slideContent: {
      width: "100%",
      alignItems: "center",
    },
    circleWrapper: {
      alignItems: "center",
      marginBottom: 20,
    },
    circleShadow: {
      shadowColor: "#00BAFF",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 30,
      borderRadius: 100,
    },
    circleButton: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(217, 217, 217, 0.1)",
      borderColor: "#000",
    },
    precautionBox: {
      borderRadius: 30,
      padding: 15,
      marginTop: 10,
      alignItems: "center",
      width: "100%",
      height: 120,
      justifyContent: "center",
    },
    precautionTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 2,
    },
    precautionRange: {
      fontWeight: "bold",
      fontSize: 16,
    },
    precautionText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 14,
      fontWeight: "600",
      marginTop: 4,
    },
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
    iconRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    infoBlock: {
      alignItems: "center",
      width: 90,
    },
    infoLabel: {
      color: "#fff",
      marginBottom: 8,
      fontSize: 13,
      fontWeight: "600",
    },
    infoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(217,217,217,0.1)",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "#000",
      shadowColor: "#00BAFF",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 30,
    },
    iconBackground: {
      position: "absolute",
      opacity: 0.2,
      zIndex: 0,
    },
    valueText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      zIndex: 1,
    },
    emptySlide: {
      padding: 40,
    },
    historicalText: {
      color: "#fff",
      fontSize: 16,
    },
  });

export default Dashboard;
