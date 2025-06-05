import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Background from "../components/Background";
import ContainerGradient from "../components/ContainerGradient";
import CurrentAQI from "../components/CurrentAQI";
import ReusableChart from "../components/ReusableChart";

const AQI = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Background>
      <ContainerGradient>
        <ReusableChart
          valuePath={"measurements"}
          value={"aqi"}
          limit={"8"}
          title={"Air Quality Index (AQI)"}
        />
        <CurrentAQI title={"Current AQI"} />
      </ContainerGradient>
    </Background>
  );
};

export default AQI;

const createStyles = (theme) =>
  StyleSheet.create({
    text: {
      color: theme.textPrimary,
    },
  });
