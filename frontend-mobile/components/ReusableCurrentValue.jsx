import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";

const ReusableCurrentValue = ({ title, valuePath, value }) => {
  const apiURL = process.env.EXPO_PUBLIC_RENDER_URL;
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentValue, setCurrentValue] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(apiURL); // loggar adress för felsökning
  useEffect(() => {
    const fetchCurrentValue = async () => {
      try {
        const response = await fetch(`${apiURL}/${valuePath}`);
        const json = await response.json();

        const data = json.map((item) => item[value]);
        const lastIndex = data.length - 1;

        setCurrentValue(data[lastIndex]);
      } catch (error) {
        console.log(`Couldnt fetch ${value} from API`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentValue();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.currentValue}>{currentValue}</Text>
    </View>
  );
};

export default ReusableCurrentValue;

const createStyles = (theme) =>
  StyleSheet.create({
    currentValue: {
      fontWeight: 800,
      fontSize: 70,
      color: theme.textPrimary,
      alignSelf: "center"
    },
    title: {
    color: theme.textPrimary,
      padding: 10,
      fontSize: 20,
      justifyContent: "center",}
  });
