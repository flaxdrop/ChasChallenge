import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeContext";
import ReusableChart from "../components/ReusableChart";
import ReusableCurrentValue from "../components/ReusableCurrentValue";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";
import BoxGradient from "../components/BoxGradient";

const Humidity = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Background>
      <ContainerGradient>
        <ReusableChart
          valuePath={"measurements"}
          value={"humidity"}
          limit={"8"}
          title={"Humidity"}
        />

        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/humidity"}
            value={"humidity"}
            title={"Current Humidity"}
            affix={"%"}
          />
        </BoxGradient>
      </ContainerGradient>
    </Background>
  );
};

export default Humidity;

const createStyles = (theme) => StyleSheet.create({});
