import { StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";
import { ThemeProvider } from "./theme/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider style={styles.SafeArea}>
    <ThemeProvider>
      <Navigation/>
    </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    marginTop: 25,
  }
});
