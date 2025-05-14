import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const animationRef = useRef();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setTimeout(() => {
        if (seen === 'true') {
          navigation.replace('MainApp');
        } else {
          navigation.replace('OnboardingScreen');
        }
      }, 2000); 
    };

    checkOnboardingStatus();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/Logo-Splash.json')} 
        autoPlay
        loop={false}
        speed={0.5}
        style={styles.animation}
      />
    </View>
  );
};

export default SplashScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.7,
    height: width * 0.7,
  },
});
