import { StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";
import { ThemeProvider } from "./theme/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Navigation/>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
