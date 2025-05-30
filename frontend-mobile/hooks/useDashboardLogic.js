import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import getAqiLevelIndex from "../utils/aqiUtils";
import data from "../data/dashboardData";

const { AQI_LEVELS } = data;

const useDashboardLogic = (apiURL) => {
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

  const fadeAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const translateYAnims = [
    useRef(new Animated.Value(20)).current,
    useRef(new Animated.Value(20)).current,
    useRef(new Animated.Value(20)).current,
    useRef(new Animated.Value(20)).current,
  ];

   const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = fadeAnims.map((fade, i) =>
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnims[i], {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(300, animations).start();
  }, []);

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
        temperature: tempData[0]?.temperature?.toFixed(0) + "°C" || "N/A",
        humidity: humData[0]?.humidity?.toFixed(0) + "%" || "N/A",
        pressure:
          presData[0]?.pressure != null
            ? (presData[0].pressure / 1000).toFixed(0) + " kPa"
            : "N/A",
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

  const showInstruction = isOn && selectedAqi === null;

  const getPrecautionText = () => {
    if (selectedAqi !== null) return AQI_LEVELS[selectedAqi];
    if (!isOn && aqiValue !== null) return AQI_LEVELS[getAqiLevelIndex(aqiValue)];
    return {
      range: "None",
      color: "#fff",
      text: "Everyone enjoy\noutdoor activities",
    };
  };

    const nextSlide = () => {
    if (slideIndex < 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 50 && slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (nativeEvent.translationX < -50 && slideIndex < 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

    useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: -slideIndex, 
      useNativeDriver: true,
    }).start();
  }, [slideIndex]);

  return {
    isOn,
    selectedAqi,
    selectedInfo,
    slideIndex,
    sensorData,
    loadingData,
    aqiValue,
    togglePower,
    getPrecautionText,
    nextSlide,
    prevSlide,
    setSelectedAqi,
    setSelectedInfo,
    showInstruction,
    fadeAnims,
    translateYAnims,
    handleSwipe,
    slideAnim,
  };
};

export default useDashboardLogic;
