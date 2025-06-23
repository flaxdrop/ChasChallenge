import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PowerButton from "../components/PowerButton";

// Mocks vector icons to avoid ESM errors when importing MaterialCommunityIcons
jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: () => null,
}));

// Mocks theme context to provide a consistent theme object for the component
jest.mock("../theme/ThemeContext", () => ({
  useTheme: () => ({
    theme: {
      shadow: "#00BAFF",
      circleBackground: "#000000",
    },
  }),
}));

describe("PowerButton component", () => {
  it("renders power icon and responds to press", () => {
    // Creates a mock function to track calls when the button is pressed
    const togglePowerMock = jest.fn();

    // Renders the PowerButton component with required props
    const { getByLabelText } = render(
      <PowerButton isOn={false} togglePower={togglePowerMock} />
    );

    // Locates the button using accessibilityLabel
    const button = getByLabelText("Power button");

    // Checks that the button exists in the render tree
    expect(button).toBeTruthy();

    // Simulates a press event on the button
    fireEvent.press(button);

    // Asserts that the togglePower function was called exactly once
    expect(togglePowerMock).toHaveBeenCalledTimes(1);
  });
});
