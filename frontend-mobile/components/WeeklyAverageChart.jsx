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
import useManualRefresh from "../hooks/useManualRefresh";

const WeeklyAverageChart = ({ title, valuePath, value, limit }) => {
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
        const response = await fetch(`${apiURL}/${valuePath}/${value}`);
        const json = await response.json();

        // Gruppérar värden per YYYY-MM-DD
        const grouped = {};
        json.forEach((item) => {
          const dateKey = new Date(item.timestamp).toISOString().split("T")[0];
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(item[value]);
        });

        // Skapa de senaste 7 dagarna inklusive idag
        const days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toISOString().split("T")[0];
          days.push(key);
        }

        // Labels till grafen
        const labels = days.map((day) =>
          new Date(day).toLocaleDateString(undefined, { weekday: "short" })
        );

        // Data till grafen
        const data = days.map((day) => {
          const values = grouped[day];
          if (!values || values.length === 0) return null; // Ingen data för dagen
          const avg = values.reduce((a, b) => a + b, 0) / values.length;
          return parseFloat(avg.toFixed(2));
        });

        // console.log("Chart Labels:", labels);
        // console.log("Chart Data:", data);

        // Sätter in labels och data korrekt till chart
        setChartData({
          labels,
          datasets: [
            {
              data,
              strokeWidth: 2,
            },
          ],
          legend: [title],
        });
      } catch (error) {
        console.error(`Error fetching ${value} data`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [valuePath, value, refresh]);

  if (loading) return <ActivityIndicator size="large" 
  accessible={true}
  accessibilityLabel="Loading weekly average chart data"/>;
  if (!chartData || !chartData.labels)
    return <Text style={styles.header}>Ingen data tillgänglig</Text>;

  return (
    <View
    accessible={true}
    accessibilityRole="summary"
    accessibilityLabel={`Weekly ${title} average of the past seven days.`}>
      <LineChart
  data={chartData}
  width={screenWidth - 36}
  height={300}
  fromZero={true}
  yAxisInterval={1}
  yLabelsOffset={20}
  xLabelsOffset={10}
  segments={5} // <-- 5 segment = 0-5 med intervall 1
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
      r: "5",
      strokeWidth: "5",
      stroke: theme.graphPoint,
    },
    propsForLabels: {
      fontSize: 18,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
    },
  }}
  bezier
/>

    </View>
  );
};

export default WeeklyAverageChart;

const createStyles = (theme) =>
  StyleSheet.create({
    chartContainer: {
      marginVertical: 8,
      borderRadius: 10,
      overflow: "hidden",
      elevation: 4,
      marginTop: 40,
    },
    header: {
      color: theme.textPrimary,
      fontSize: 20,
      textAlign: "center",
    },
  });
