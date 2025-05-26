/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedLoader } from "../ThemedLoader";

// Mockeamos los componentes de react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    ActivityIndicator: jest.fn(({ color, size, ...props }) => (
      <View testID="activity-indicator" {...props}>
        <View testID="indicator-color" style={{ backgroundColor: color }} />
        <View testID="indicator-size" size={size} />
      </View>
    )),
  };
});

describe("Probar <ThemedLoader />", () => {
  test("Debe renderizar el loader con el tamaño predeterminado si no se proporciona", () => {
    const color = "red";

    render(<ThemedLoader color={color} />);

    const indicatorSize = screen.getByTestId("indicator-size");
    expect(indicatorSize.props.size).toBeUndefined();
  });

  test("Debe renderizar el loader con el color proporcionado", () => {
    const color = "blue";

    render(<ThemedLoader color={color} />);

    const indicatorColor = screen.getByTestId("indicator-color");
    expect(indicatorColor.props.style).toEqual({ backgroundColor: color });
  });

  test("Debe renderizar el loader con tamaño small cuando se proporciona", () => {
    const color = "green";
    const size = "small";

    render(<ThemedLoader color={color} size={size} />);

    const indicatorSize = screen.getByTestId("indicator-size");
    expect(indicatorSize.props.size).toBe(size);
  });

  test("Debe renderizar el loader con tamaño large cuando se proporciona", () => {
    const color = "yellow";
    const size = "large";

    render(<ThemedLoader color={color} size={size} />);

    const indicatorSize = screen.getByTestId("indicator-size");
    expect(indicatorSize.props.size).toBe(size);
  });

  test("Debe pasar correctamente la clase mx-auto al ActivityIndicator", () => {
    const color = "purple";

    render(<ThemedLoader color={color} />);

    const activityIndicator = screen.getByTestId("activity-indicator");
    expect(activityIndicator.props.className).toBe("mx-auto");
  });

  test("Debe renderizar correctamente el componente ActivityIndicator", () => {
    const color = "orange";

    render(<ThemedLoader color={color} />);

    const activityIndicator = screen.getByTestId("activity-indicator");
    expect(activityIndicator).toBeTruthy();
  });

});
