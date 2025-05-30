import { StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";
import { ThemeProvider } from "./theme/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.GestureHandler}>
      <SafeAreaProvider style={styles.SafeArea}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    marginTop: 0,
  },
  GestureHandler:{
    flex:1,
  }
});
