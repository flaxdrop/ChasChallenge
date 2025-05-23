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

// Skärmbredd
const { width } = Dimensions.get("window");

// AQI-nivåer
const AQI_LEVELS = [
  { color: "#00E400", range: "0 - 50", text: "Air quality is satisfactory, and air pollution poses little or no risk." },
  { color: "#FFFF00", range: "51 - 100", text: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution." },
  { color: "#FF7E00", range: "101 - 150", text: "Members of sensitive groups may experience health effects. The general public is less likely to be affected." },
  { color: "#FF0000", range: "151 - 200", text: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects." },
  { color: "#8F3F97", range: "201 - 300", text: "Health alert: The risk of health effects is increased for everyone." },
  { color: "#7E0023", range: "301+", text: "Health warning of emergency conditions: everyone is more likely to be affected." },
];

// INFO_ITEMS
const INFO_ITEMS = [
  { type: "temperature", label: "Temperature", icon: "thermometer", color: "#FF3B30" },
  { type: "humidity", label: "Humidity", icon: "cloud", color: "#00FF1A" },
  { type: "pressure", label: "Air Pressure", icon: "gauge", color: "#00BAFF" },
];

const Dashboard = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [isOn, setIsOn] = useState(true);
  const [selectedAqi, setSelectedAqi] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const [sensorData, setSensorData] = useState({ temperature: null, humidity: null, pressure: null });
  const [loadingData, setLoadingData] = useState(false);

  const apiURL = process.env.EXPO_PUBLIC_RENDER_URL;

  useEffect(() => {
    if (!isOn) {
      fetchSensorData();
    }
  }, [isOn]);

  const fetchSensorData = async () => {
    try {
      setLoadingData(true);

      const [tempRes, humRes, presRes] = await Promise.all([
        fetch(`${apiURL}/measurements/temperature`),
        fetch(`${apiURL}/measurements/humidity`),
        fetch(`${apiURL}/measurements/pressure`)
      ]);

      const tempData = await tempRes.json();
      const humData = await humRes.json();
      const presData = await presRes.json();

      setSensorData({
        temperature: tempData[0]?.temperature?.toFixed(1) + "°C" || "N/A",
        humidity: humData[0]?.humidity?.toFixed(1) + "%" || "N/A",
        pressure: presData[0]?.pressure?.toFixed(1) + " Pa" || "N/A"
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
    if (selectedAqi === null) {
      return { range: "None", color: "#fff", text: "Everyone enjoy\noutdoor activities" };
    }
    return AQI_LEVELS[selectedAqi];
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
          {AQI_LEVELS.map((level, index) => (
            <Pressable
              key={index}
              style={[
                styles.aqiLevel,
                { backgroundColor: level.color },
                selectedAqi === index && { borderWidth: 2, borderColor: "#fff" },
              ]}
              onPress={() => isOn && setSelectedAqi(index === selectedAqi ? null : index)}
            />
          ))}
        </View>
      </View>

      {/* SLIDE CONTENT */}
      <View style={styles.slideContainer}>
        {slideIndex === 0 ? (
          <View style={styles.slideContent}>
            {/* POWER BUTTON */}
            <View style={styles.circleWrapper}>
              <View style={styles.circleShadow}>
                <Pressable
                  onPress={togglePower}
                  style={[styles.circleButton, { backgroundColor: "rgba(217, 217, 217, 0.1)", borderColor: "#000" }]}
                >
                  <MaterialCommunityIcons
                    name="power"
                    size={60}
                    color={isOn ? "#00FF1A" : "#FF0000"}
                  />
                </Pressable>
              </View>
            </View>

            {/* AQI PRECAUTIONS */}
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

      {/* SENSOR CIRCLES */}
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
                      style={{ position: "absolute", opacity: 0.2, zIndex: 0 }}
                    />
                    <Text style={[styles.valueText, { zIndex: 1 }]}>
                      {sensorData[item.type] || "N/A"}
                    </Text>
                  </>
                ) : (
                  <MaterialCommunityIcons name={item.icon} color={item.color} size={32} />
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

// STILAR
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
    valueText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
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
