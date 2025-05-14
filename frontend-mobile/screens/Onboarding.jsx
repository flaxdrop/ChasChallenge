import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = ({ navigation }) => {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.replace("MainApp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välkommen!</Text>
      <Button title="Kom igång" onPress={finishOnboarding} />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
