import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  const animationRef = useRef();

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel="Loading AirAware, please wait"
    >
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/Logo-animation')}
        autoPlay
        loop={false}
        speed={1}
        style={styles.animation}
        onAnimationFinish={() => {
          navigation.replace('OnboardingScreen');
        }}
        accessibilityLabel="AirAware app is starting"
        accessibilityRole="image"
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
