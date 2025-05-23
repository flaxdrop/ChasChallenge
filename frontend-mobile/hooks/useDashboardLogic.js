import { useState, useEffect } from "react";
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
        pressure:
          presData[0]?.pressure != null
            ? (presData[0].pressure / 1000).toFixed(1) + " kPa"
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

  const getPrecautionText = () => {
    if (selectedAqi !== null) return AQI_LEVELS[selectedAqi];
    if (!isOn && aqiValue !== null) return AQI_LEVELS[getAqiLevelIndex(aqiValue)];
    return { range: "None", color: "#fff", text: "Everyone enjoy\noutdoor activities" };
  };

  const nextSlide = () => setSlideIndex((slideIndex + 1) % 2);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + 2) % 2);

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
  };
};

export default useDashboardLogic;
