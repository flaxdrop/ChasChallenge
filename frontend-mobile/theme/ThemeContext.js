import React, { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./colors";
import { buildCustomTheme } from "./customTheme";
import { StatusBar } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;
  const customTheme = buildCustomTheme(theme, isDark);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    StatusBar.setBarStyle(isDark? 'light' : 'dark');
    StatusBar.setBackgroundColor(isDark? darkTheme.headerBackground : lightTheme.headerBackground);
  }, [isDark, darkTheme.headerBackground, lightTheme.headerBackground])

  return (
    <ThemeContext.Provider value={{ isDark, theme, customTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
