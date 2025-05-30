import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const PaginationDots = ({ slideIndex }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot,
          { backgroundColor: slideIndex === 0 ? "#002BFF" : "#5DD3FF" },
        ]}
      />
      <View
        style={[
          styles.dot,
          { backgroundColor: slideIndex === 1 ? "#002BFF" : "#5DD3FF" },
        ]}
      />
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
});

export default PaginationDots;
