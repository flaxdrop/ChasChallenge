import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableChart from "../components/ReusableChart";
import ReusableCurrentValue from "../components/ReusableCurrentValue";
import ContainerGradient from "../components/ContainerGradient";
import Background from "../components/Background";
import BoxGradient from "../components/BoxGradient";

const Temperature = () => {
  return (
    <Background>
      <ContainerGradient>
        <ReusableChart
          valuePath={"measurements"}
          value={"temperature"}
          limit={"8"}
          title={"Temperature"}
        />
  <BoxGradient>
        <ReusableCurrentValue
          valuePath={"measurements/temperature"}
          value={"temperature"}
          title={"Current Temperature"}
          
        /></BoxGradient>
      </ContainerGradient>
    </Background>
  );
};

export default Temperature;

const styles = StyleSheet.create({});
