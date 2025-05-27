import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from 'expo-linear-gradient'; 
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const finishOnboarding = async () => {
    navigation.replace("MainApp");
  };

const Skip = ({ ...props }) => (
  <TouchableOpacity style={styles.flatButton} {...props}>
    <Text style={styles.flatButtonText}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={styles.flatButton} {...props}>
    <Text style={styles.flatButtonText}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={styles.flatButton} {...props}>
    <Text style={styles.flatButtonText}>Done</Text>
  </TouchableOpacity>
);

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
                Real-time monitoring for accurate measurements of temperature, humidity, air pressure, and more, providing an overview of air quality

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
                AQI database integrated via API server, eases the accessibility of the monitor's airquality data remotely through the app on your smartphone
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
                  <Text style={styles.titleBlue}>Precaution </Text>
                  <Text style={styles.titleGreen}>Alert</Text>
                </Text>
              </View>
            ),
            subtitle: (
              <Text style={styles.description}>
                Real-time precautions and personalized notifications based on current AQI values to preserve your health and well-being safely
              </Text>
            ),
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const createStyles = (theme) =>
  StyleSheet.create({
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

  flatButton: {
    backgroundColor: '#5DD3FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 40 * 0.41,
    alignSelf: 'center',
    alignItems: 'center',
  },

  flatButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
