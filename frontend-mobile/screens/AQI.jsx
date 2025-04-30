import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeContext";
import Background from "../components/Background";
import AqiDisplay from "../components/AqiDisplay";

const AQI = () => {
  return (
    <Background>

        <View>
          <AqiDisplay>
            <Text>Hej</Text>
          </AqiDisplay>
        </View>

    </Background>
  );
};

export default AQI;

const styles = StyleSheet.create({});
