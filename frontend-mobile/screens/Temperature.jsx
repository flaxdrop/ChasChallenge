import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableChart from "../components/ReusableChart";
import ReusableCurrentValue from "../components/ReusableCurrentValue";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";

const Temperature = () => {
  return (
    <Background>
      <ContainerGradient>
        <ReusableChart
          valuePath={"measurements/temperature"}
          value={"temperature"}
          title={"Temperature"}
        />

        <ReusableCurrentValue
          valuePath={"measurements/temperature"}
          value={"temperature"}
          title={"Current Temperature"}
        />
      </ContainerGradient>
    </Background>
  );
};

export default Temperature;

const styles = StyleSheet.create({});
