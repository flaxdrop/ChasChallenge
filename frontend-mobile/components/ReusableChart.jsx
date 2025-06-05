import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { LineChart } from "react-native-chart-kit";
import useRefresh from "../hooks/useRefresh";
import RefreshButton from "./RefreshButton";
import useManualRefresh from "../hooks/useManualRefresh";

const ReusableChart = ({ title, valuePath, value, limit }) => {
  const apiURL = process.env.EXPO_PUBLIC_RENDER_URL;
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const screenWidth = Dimensions.get("window").width;
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const refresh = useRefresh();
  const [manualRefresh, triggerRefresh] = useManualRefresh();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiURL}/${valuePath}/${value}?limit=${limit}`
        ); //measurements/humidity, measurements/temperature, measurements/pressure
        const json = await response.json();

        const labels = json.map((item) =>
          new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        labels.reverse(); //reverses time to display properly in graph

        const data = json.map((item) => item[value]);
        data.reverse(); //reverses data to correspond to timestamps

        setChartData({
          labels,
          datasets: [{ data, strokeWidth: 2 }],
        });
      } catch (error) {
        console.error(`Error fetching ${value} data`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [valuePath, value, refresh]);

  if (loading) return <ActivityIndicator size="large" />;
  if (!chartData || !chartData.labels)
    return <Text style={styles.header}>Ingen data tillgänglig</Text>;

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <View
      accessible={true}
      accessibilityLabel={`Chart showing ${title}. Data ranges from ${Math.min(
        ...chartData.datasets[0].data
      )} to ${Math.max(...chartData.datasets[0].data)} Latest value is ${
        chartData.datasets[0].data.slice(-1)[0]
      }.`}
    >
      <View style={styles.header}>
        <Text style={styles.header}>{title}</Text>
        <RefreshButton onRefresh={triggerRefresh}
        accessibilityRole="button"
        accessibilityLabel={`Refresh ${title} chart`} />
      </View>
      <LineChart
        accessible={false}
        importantforaccessibility="no"
        data={chartData}
        width={screenWidth - 36}
        height={220}
        style={styles.chartContainer}
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: theme.graphFrom,
          backgroundGradientTo: theme.graphTo,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.graphPoint,
          labelColor: (opacity = 1) => theme.accent,
          style: { borderRadius: 10 },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: theme.graphPoint,
          },
          propsForLabels: {
            fontSize: 10,
          },
          propsForBackgroundLines: {
            strokeWidth: 0.2,
          },
        }}
        bezier
      />
    </View>
  );
};

export default ReusableChart;

const createStyles = (theme) =>
  StyleSheet.create({
    chartContainer: {
      marginVertical: 8,
      borderRadius: 10,
      overflow: "hidden",
      elevation: 4,
    },
    header: {
      color: theme.textPrimary,
      fontSize: 20,
      textAlign: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
