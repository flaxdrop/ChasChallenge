# Unit Tests Summary

This project uses Jest and React Native Testing Library to perform unit tests on React Native components. Below is a summary of the current unit tests implemented.

## 📌 PowerButton.test.jsx

**What it tests:**
- Verifies that the `PowerButton` component renders correctly.
- Checks that the button can be pressed and that the `togglePower` function is called exactly once on press.

**Mocking:**
- `@expo/vector-icons` is mocked to avoid ESM-related import errors.
- `ThemeContext` is mocked to provide a consistent `theme` object during testing.

## 📌 SlideContent.test.jsx

**What it tests:**
- Ensures the `SlideContent` component renders successfully when `slideIndex` is 0.

**Mocking:**
- `react-native-gesture-handler` is mocked to avoid version conflicts with React Native's renderer.
- `ThemeContext` is mocked to supply a consistent `theme` object.
- Child components (`PowerButton`, `PrecautionBox`, `WeeklyAverageChart`) are mocked to isolate the `SlideContent` component during testing.

**Additional Notes:**
- `jest.setup.js` includes the `react-native-gesture-handler/jestSetup` import to prepare the test environment.
- Native modules and dependencies that are not relevant to the unit tests are mocked as needed to prevent runtime errors.
