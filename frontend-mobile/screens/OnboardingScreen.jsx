import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const finishOnboarding = async () => {
    navigation.replace("MainApp");
  };

  // Skip-knapp
  const Skip = ({ ...props }) => (
    <TouchableOpacity style={styles.skipButton} {...props}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );

  // Nästa-knapp
  const Next = ({ ...props }) => (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <Text style={styles.nextText}>Next ➤</Text>
    </TouchableOpacity>
  );

  // Klar-knapp (sista sidan)
  const Done = ({ ...props }) => (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <Text style={styles.nextText}>Done</Text>
    </TouchableOpacity>
  );

  // Anpassad slidepunkt (indikator)
  const Dots = ({ selected }) => {
    return (
      <View
        style={[
          styles.dot,
          selected ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={finishOnboarding}
        onSkip={finishOnboarding}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        bottomBarHighlight={false}
        bottomBarHeight={100} 
        showSkip={true}
        showNext={true}
        showDone={true}
        containerStyles={{ paddingHorizontal: 20 }}
        pages={[
          {
            backgroundColor: '#000711',
            image: (
              <View style={styles.contentWrapper}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={require('../assets/images/Lines.png')} 
                    style={styles.backgroundImage}
                    resizeMode="cover"
                  />
                  <LottieView
                    source={require('../assets/animations/test.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                  />
                </View>
              </View>
            ),
            title: (
              <View style={styles.titleBlock}>
                <Text style={styles.caption}>Innovation in every wave</Text>
                <Text style={styles.title}>
                  <Text style={styles.titleBlue}>Air Quality </Text>
                  <Text style={styles.titleGreen}>Sensor</Text>
                </Text>
              </View>
            ),
            subtitle: (
              <Text style={styles.description}>
                Real-time monitoring: provides
                accurate and real-time monitoring
                of PM2.5 concentration,
                temperature, and humidity
              </Text>
            ),
          },
          {
            backgroundColor: '#000711',
            image: (
              <View style={styles.contentWrapper}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={require('../assets/images/Lines.png')} 
                    style={styles.backgroundImage}
                    resizeMode="cover"
                  />
                  <LottieView
                    source={require('../assets/animations/Data-Accessibility.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                  />
                </View>
              </View>
            ),
            title: (
              <View style={styles.titleBlock}>
                <Text style={styles.caption}>Innovation in every wave</Text>
                <Text style={styles.title}>
                  <Text style={styles.titleBlue}>Data </Text>
                  <Text style={styles.titleGreen}>Accessibiltity</Text>
                </Text>
              </View>
            ),
            subtitle: (
              <Text style={styles.description}>
                AQI data cloud storage eases the accessibility of the monitor's airquality data remotely through the app on your smartphone
              </Text>
            ),
          },
          {
            backgroundColor: '#000711',
            image: (
              <View style={styles.contentWrapper}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={require('../assets/images/Lines.png')} 
                    style={styles.backgroundImage}
                    resizeMode="cover"
                  />
                  <LottieView
                    source={require('../assets/animations/Pollution-maps.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                  />
                </View>
              </View>
            ),
            title: (
              <View style={styles.titleBlock}>
                <Text style={styles.caption}>Innovation in every wave</Text>
                <Text style={styles.title}>
                  <Text style={styles.titleBlue}>Pollution </Text>
                  <Text style={styles.titleGreen}>Maps</Text>
                </Text>
              </View>
            ),
            subtitle: (
              <Text style={styles.description}>
                Real-time health advice and personalized notifications based on current polluted areas and your underlying health conditions
              </Text>
            ),
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000711',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  contentWrapper: {
    marginTop: -80, 
    alignItems: 'center',
  },
  
imageWrapper: {
  width: 240,
  height: 240,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#00BAFF',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1,
  shadowRadius: 100,
  elevation: 20,
},

lottie: {
  width: 300,
  height: 300,
  position: 'absolute', 
},

backgroundImage: {
  width: 300,
  height: 300,
  borderRadius: 150,
  position: 'absolute',
},

  skipButton: {
    backgroundColor: '#5DD3FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 40 * 0.41,
    alignSelf: 'center',
  },
  
  skipText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: '#5DD3FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 40 * 0.41,
    alignSelf: 'center',
  },
  nextText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 20,
  },
  caption: {
    color: '#5DD3FF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleBlue: {
    color: '#00BAFF',
  },
  titleGreen: {
    color: '#00FF1A',
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 20,
    lineHeight: 22, 
    paddingHorizontal: 10
  },
  dot: {
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#000',
    alignSelf: 'center'
  },
  activeDot: {
    width: 30,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#5DD3FF',
  },
  inactiveDot: {
    width: 14,
    height: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(93, 211, 255, 0.4)',
  },
});
