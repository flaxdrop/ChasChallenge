import { StyleSheet, Text, View, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import ValueInfoModal from "./ValueInfoModal";
import useRefresh from "../hooks/useRefresh";

const ReusableCurrentValue = ({
  title,
  valuePath,
  value,
  valueSize,
  textSize,
  affix,
}) => {
  const apiURL = process.env.EXPO_PUBLIC_RENDER_URL;
  const { theme } = useTheme();
  const styles = createStyles(theme, valueSize, textSize);

  const [currentValue, setCurrentValue] = useState();
  const [timestamp, setTimestamp] = useState();

  const [loading, setLoading] = useState(true);
  const refresh = useRefresh();

  const [modalVisible, setModalVisible] = useState(false);
  // console.log(apiURL); // loggar adress för felsökning
  useEffect(() => {
    const fetchCurrentValue = async () => {
      try {
        const response = await fetch(`${apiURL}/${valuePath}`);
        const json = await response.json();

        const data = json.map((item) => item[value]);
        const timedata = json.map((item) => item["timestamp"]);

        const lastIndex = data.length - data.length;

        // console.log(data[lastIndex]);
        const formattedTime = new Date(timedata[lastIndex]).toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        setCurrentValue(data[lastIndex].toFixed(1));
        setTimestamp(formattedTime);
      } catch (error) {
        console.log(`Couldnt fetch ${value} from API`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentValue();
  }, [refresh]);

  const handlePress = () => {
    // console.log(`${value}`);
    setModalVisible(true);
  };

  if (loading) return <ActivityIndicator size="large" 
  accessibilityLabel="Loading current value"/>;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable android_ripple={{color: theme.tabBarIcon, radius: 15}}
        onPress={handlePress}>
        <MaterialCommunityIcons
          name="information-outline"
          size={22}
          style={styles.infoIcon}
          
          accessibilityRole="button"
          accessibilityLabel={`Description of what ${title} is`}
        /></Pressable>
      </View>
      <View
      accessible={true}
      accessibilityLabel={`Current ${title} is ${currentValue} and was last updated on ${timestamp}`}>
        <Text style={styles.currentValue}>
          {currentValue}
          {affix}
        </Text>
        <Text style={styles.timestamp}>Updated: {timestamp}</Text>
      </View>
      <ValueInfoModal
        value={value}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ReusableCurrentValue;

const createStyles = (theme, valueSize, textSize) =>
  StyleSheet.create({
    currentValue: {
      fontWeight: 800,
      fontSize: valueSize || 70,
      color: theme.textPrimary,
      alignSelf: "center",
      paddingBottom: 10,
    },
    title: {
      color: theme.textPrimary,
      padding: 10,
      fontSize: textSize || 20,
      justifyContent: "center",
    },
    infoIcon: {
      padding: 10,
      color: theme.tabBarIcon,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    timestamp: {
      justifyContent: "center",
      alignSelf: "center",
      fontSize: 12,
      marginBottom: 5,
      color: theme.timestamp,
    },
  });
