import { StyleSheet, View, Platform } from "react-native";
import Navigation from "./navigation/Navigation";
import { ThemeProvider } from "./theme/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.GestureHandler}>
      <SafeAreaProvider>
        <View style={styles.fullScreen}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

  GestureHandler:{
    flex:1,
  },
  fullScreen: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : 0,
  }
});