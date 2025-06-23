module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(expo-font|@expo/vector-icons|expo-asset|react-native|react-navigation|@react-native|expo(-.*)?)/)"
  ],
};
