import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import AQI from '../screens/AQI';
import Humidity from '../screens/Humidity';
import Temperature from '../screens/Temperature';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from '../theme/ThemeContext';


const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { customTheme, theme, isDark } = useTheme();
  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator>
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}/>
          )
        }}/>
        <Tab.Screen
        name="Air Quality"
        component={AQI}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weather-hazy" color={color} size={size}/>
          )
        }}/>
        <Tab.Screen
        name="Humidity"
        component={Humidity}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weather-fog" color={color} size={size}/>
          )
        }}/>
        <Tab.Screen
        name="Temperature"
        component={Temperature}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="thermometer" color={color} size={size}/>
          )
        }}/>
        <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size}/>
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;