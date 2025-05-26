import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import ValueInfoModal from "./ValueInfoModal";

const ReusableCurrentValue = ({
  title,
  valuePath,
  value,
  valueSize,
  textSize,
}) => {
  const apiURL = process.env.EXPO_PUBLIC_RENDER_URL;
  const { theme } = useTheme();
  const styles = createStyles(theme, valueSize, textSize);

  const [currentValue, setCurrentValue] = useState();
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  // console.log(apiURL); // loggar adress för felsökning
  useEffect(() => {
    const fetchCurrentValue = async () => {
      try {
        const response = await fetch(`${apiURL}/${valuePath}`);
        const json = await response.json();

        const data = json.map((item) => item[value]);
        const lastIndex = data.length - data.length;

        console.log(data[lastIndex]);

        setCurrentValue(data[lastIndex].toFixed(1));
      } catch (error) {
        console.log(`Couldnt fetch ${value} from API`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentValue();
  }, []);

  const handlePress = () => {
  // console.log(`${value}`);
  setModalVisible(true);
  }

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  style={styles.infoIcon}
                  onPress={handlePress}
                />
      </View>
      <Text style={styles.currentValue}>{currentValue}</Text>
      <ValueInfoModal
      value={value}
      visible={modalVisible}
      onClose={() => setModalVisible(false)}/>
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
    },
    title: {
      color: theme.textPrimary,
      padding: 10,
      fontSize: textSize || 20,
      justifyContent: "center",
    },
    infoIcon: {
      padding: 10,
      color: theme.accent
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  });
