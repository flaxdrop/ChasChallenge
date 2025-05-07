import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../theme/ThemeContext'
import {LineChart} from 'react-native-chart-kit'

const ReusableChart = ({title, valuePath, value}) => {
    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const screenWidth = Dimensions.get('window').width;
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {      
        const fetchData = async () => {            
            try {
                const response = await fetch(`${apiURL}/${valuePath}/`); //measurements/humidity, measurements/temperature, measurements/pressure
                const json = await response.json();
                // console.log("Fetched data:", json);
                
                const labels = json.map(item => 
                    new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                );

                const data = json.map(item => item[value]);

                setChartData({
                    labels, 
                    datasets: [{data, strokeWidth: 2}]
                });
            
            } catch (error) {
                console.error(`Error fetching ${value} data`, error);
                
            } finally {
                setLoading(false);
            };
        };

        fetchData();
    }, [valuePath, value]);

    if (loading) return <ActivityIndicator size="large"/>
  return (
    <View>
        <Text style={styles.header}>{title}</Text>
      <LineChart
      data={chartData}
      width={screenWidth - 36}
      height={220}
      style={styles.chartContainer}
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: theme.graphFrom,
        backgroundGradientTo: theme.graphTo,
        decimalPlaces: 0,
        color: (opacity = 1) => theme.graphPoint,
        labelColor: (opacity = 1) => theme.accent,
        style: { borderRadius: 10},
        propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: theme.graphPoint,
        }
      }}
      bezier/>
    </View>
  )
}

export default ReusableChart

const createStyles = (theme) => StyleSheet.create({
    chartContainer: {
        marginVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4,
    },
    header: {
        color: theme.textPrimary,
        fontSize: 20,
        textAlign: "center"
    }
})