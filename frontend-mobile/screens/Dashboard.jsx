import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../components/Background'
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Dashboard = () => {
  useEffect(() => {
    AsyncStorage.removeItem("hasSeenOnboarding"); 
  }, []);

  return (
    <Background>
    <View>
      <Text>Dashboard</Text>
    </View>
    </Background>
  );
};

export default Dashboard;

const styles = StyleSheet.create({})