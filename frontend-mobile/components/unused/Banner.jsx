import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeContext";

const Banner = () => {
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.banner}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      ></Image>
      <Image
        source={require("../assets/images/airaware.png")}
        style={styles.logotext}
      ></Image>
    </View>
  );
};

export default Banner;

const createStyles = (theme) => StyleSheet.create({
    banner: {
        flexDirection: "row",
        backgroundColor: theme.headerBackground,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 10,
      },
      logo: {
        width: 70,
        height: 70,
        marginRight: 4
      },
      logotext: {
        width: 230,
        height: 50,
        resizeMode: "contain",
      }
});
