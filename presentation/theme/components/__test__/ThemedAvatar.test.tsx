/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedAvatar } from "../ThemedAvatar";
import { Formatter } from "@/config/helpers";

const defaultAvatarColor = "#6200ee";

jest.mock("../../hooks", () => ({
  useThemeColor: jest.fn().mockReturnValue(defaultAvatarColor),
}));

jest.mock("@/config/helpers", () => ({
  Formatter: {
    initialLetters: jest.fn((text) => text.substring(0, 2).toUpperCase()),
  },
}));

// Mock para Avatar.Text de react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    Avatar: {
      Text: jest.fn(({ size, label, color, theme, labelStyle }) => (
        <View testID="avatar-container">
          <Text testID="avatar-size">{size}</Text>
          <Text testID="avatar-label">{label}</Text>
          <Text testID="avatar-color">{color}</Text>
          <Text testID="avatar-bg-color">{theme.colors.primary}</Text>
          <View testID="avatar-label-style" style={labelStyle} />
        </View>
      )),
    },
  };
});

describe("Probar <ThemedAvatar />", () => {
  test("Debe renderizar el avatar con los valores por defecto", () => {
    const label = "John Doe";
    
    render(<ThemedAvatar label={label} />);
    
    const avatarSize = screen.getByTestId("avatar-size");
    const avatarLabel = screen.getByTestId("avatar-label");
    const avatarColor = screen.getByTestId("avatar-color");
    const avatarBgColor = screen.getByTestId("avatar-bg-color");
    
    expect(avatarSize.props.children).toBe(64);
    expect(avatarLabel.props.children).toBe("JO"); 
    expect(avatarColor.props.children).toBe("white");
    expect(avatarBgColor.props.children).toBe(defaultAvatarColor);
  });

  test("Debe renderizar el avatar con el tamaño personalizado", () => {
    const label = "John Doe";
    const size = 100;
    
    render(<ThemedAvatar label={label} size={size} />);
    
    const avatarSize = screen.getByTestId("avatar-size");
    const labelStyle = screen.getByTestId("avatar-label-style");
    
    expect(avatarSize.props.children).toBe(size);
    expect(labelStyle.props.style.fontSize).toBe(size / 3);
  });

  test("Debe renderizar el avatar con el color de texto personalizado", () => {
    const label = "John Doe";
    const color = "red";
    
    render(<ThemedAvatar label={label} color={color} />);
    
    const avatarColor = screen.getByTestId("avatar-color");
    
    expect(avatarColor.props.children).toBe(color);
  });

  test("Debe renderizar el avatar con el color de fondo personalizado", () => {
    const label = "John Doe";
    const bgColor = "blue";
    
    render(<ThemedAvatar label={label} bgColor={bgColor} />);
    
    const avatarBgColor = screen.getByTestId("avatar-bg-color");
    
    expect(avatarBgColor.props.children).toBe(bgColor);
  });

  test("Debe aplicar correctamente los estilos de etiqueta", () => {
    const label = "John Doe";
    const size = 120;
    
    render(<ThemedAvatar label={label} size={size} />);
    
    const labelStyle = screen.getByTestId("avatar-label-style");
    
    expect(labelStyle.props.style).toEqual({
      fontSize: size / 3,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: "semibold",
    });
  });

  test("Debe llamar a Formatter.initialLetters() con el texto proporcionado", () => {
    const label = "Alice Johnson";
    
    render(<ThemedAvatar label={label} />);
    
    expect(Formatter.initialLetters).toHaveBeenCalledWith(label);
  });
});