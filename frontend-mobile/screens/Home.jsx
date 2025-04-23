import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useTheme } from "../theme/ThemeContext";
import Background from "../components/Background";
import Banner from "../components/Banner";
import AqiDisplay from "../components/AqiDisplay";
import TemperatureSmall from "../components/TemperatureSmall";
import HumiditySmall from "../components/HumiditySmall";

const Home = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Background>
      <View style={styles.container}>
        <Banner />
        <AqiDisplay title={"Air Quality Index"} />
        <View style={styles.smallContainer}>
          <TemperatureSmall/>
          <HumiditySmall/>
        </View>
      </View>
    </Background>
  );
};

export default Home;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    smallContainer: {
      flexDirection: "row",
    }
  });
