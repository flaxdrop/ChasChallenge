import React, { useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  StyleSheet
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import AqiBar from "../components/AqiBar.jsx";
import PowerButton from "../components/PowerButton";
import PrecautionBox from "../components/PrecautionBox";
import AqiSlideshowHeader from "../components/AqiSlideshowHeader";
import SensorInfoCircles from "../components/SensorInfoCircles";


const { width } = Dimensions.get("window");

const Dashboard = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => setIsOn((prev) => !prev);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme.textPrimary === "#FFFFFF" ? "light-content" : "dark-content"}
        backgroundColor={theme.backgroundPrimary}
      />
      <View style={styles.container}>
        <AqiBar />
        <PowerButton isOn={isOn} onToggle={handleToggle} />
        <PrecautionBox />
        <AqiSlideshowHeader />
        <SensorInfoCircles isOn={isOn} />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
  });

export default Dashboard;