import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableCurrentValue from "../components/ReusableCurrentValue";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";
import BoxGradient from "../components/BoxGradient";

const Overview = () => {
  return (
    <Background>
      <ContainerGradient>
        <Text>Overview of latest sensor data</Text>
        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/aqi"}
            value={"aqi"}
            title={"AQI"}
            valueSize={16}
            textSize={16}
          />
        </BoxGradient>
        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/humidity"}
            value={"humidity"}
            title={"Humidity"}
            valueSize={16}
            textSize={16}
          />
        </BoxGradient>
        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/temperature"}
            value={"temperature"}
            title={"Temperature"}
            valueSize={16}
            textSize={16}
          />
        </BoxGradient>
        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/pressure"}
            value={"pressure"}
            title={"Air Pressure"}
            valueSize={16}
            textSize={16}
          />
        </BoxGradient>
        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/tvoc"}
            value={"tvoc"}
            title={"TVOC"}
            valueSize={16}
            textSize={16}
          />
        </BoxGradient>
        <BoxGradient>
          <ReusableCurrentValue
            valuePath={"measurements/eco2"}
            value={"eco2"}
            title={"ECO2"}
            valueSize={16}
            textSize={16}
          />
        </BoxGradient>
      </ContainerGradient>
    </Background>
  );
};

export default Overview;

const styles = StyleSheet.create({});
