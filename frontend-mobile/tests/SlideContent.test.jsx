import React from "react";
import { render } from "@testing-library/react-native";
import SlideContent from "../components/SlideContent";

// Mocks react-native-gesture-handler to avoid version conflicts and native dependency issues in tests
jest.mock("react-native-gesture-handler", () => {
  const { View } = require("react-native");
  return {
    PanGestureHandler: ({ children }) => <View>{children}</View>,
  };
});

// Mocks ThemeContext to provide a static theme object for the component during tests
jest.mock("../theme/ThemeContext", () => ({
  useTheme: () => ({
    theme: {
      textPrimary: "black",
    },
  }),
}));

// Mocks child components to isolate the SlideContent component during the test
jest.mock("../components/PowerButton", () => () => null);
jest.mock("../components/PrecautionBox", () => () => null);
jest.mock("../components/WeeklyAverageChart", () => () => null);

describe("SlideContent", () => {
  it("renders successfully when slideIndex is 0", () => {
    // Renders the SlideContent component with required props
    const { toJSON } = render(
      <SlideContent
        slideIndex={0}
        isOn={false}
        togglePower={() => {}}
        range=""
        color=""
        text=""
        showInstruction={false}
        handleSwipe={() => {}}
      />
    );

    // Verifies that the component rendered without crashing
    expect(toJSON()).toBeTruthy();
  });
});
