import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Overview from "../screens/Overview";
import Settings from "../screens/Settings";
import AQI from "../screens/AQI";
import Humidity from "../screens/Humidity";
import Temperature from "../screens/Temperature";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";

import { useTheme } from "../theme/ThemeContext";
import Dashboard from "../screens/Dashboard";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.tabBar },
        tabBarInactiveTintColor: theme.tabBarIcon,
        tabBarActiveTintColor: theme.tabBarIconActive,
        tabBarActiveBackgroundColor: theme.primary,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} accessible={false}/>
          ),
          tabBarAccessibilityLabel: "Dashboard tab",
        }}
      />

      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
              accessible={false}
            />
          ),
          tabBarAccessibilityLabel: "Overview tab",
        }}
      />
      <Tab.Screen
        name="Air Quality"
        component={AQI}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weather-hazy"
              color={color}
              size={size}
              accessible={false}
            />
          ),
          tabBarAccessibilityLabel: "Air quality tab",
        }}
      />
      <Tab.Screen
        name="Humidity"
        component={Humidity}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weather-fog"
              color={color}
              size={size}
              accessible={false}
            />
          ),
          tabBarAccessibilityLabel: "Humidity tab",
        }}
      />
      <Tab.Screen
        name="Temperature"
        component={Temperature}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="thermometer"
              color={color}
              size={size}
              accessible={false}
            />
          ),
          tabBarAccessibilityLabel: "Temperature tab",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} accessible={false}/>
          ),
          tabBarAccessibilityLabel: "Settings tab",
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { customTheme } = useTheme();

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="MainApp" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
