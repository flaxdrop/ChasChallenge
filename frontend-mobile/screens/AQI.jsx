import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Background from "../components/Background";
import ContainerGradient from "../components/ContainerGradient";
import AqiChart from "../components/AqiChart";
import CurrentAQI from "../components/CurrentAQI";


const AQI = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Background>

        <ContainerGradient>
       
            <Text style={styles.text}>Air Quality Index</Text>
            <AqiChart/>
            <CurrentAQI title={"Current AQI"}/>
          
        </ContainerGradient>

    </Background>
  );
};

export default AQI;

const createStyles = (theme) => StyleSheet.create({
  text: {
    color: theme.textPrimary,
  }
});
