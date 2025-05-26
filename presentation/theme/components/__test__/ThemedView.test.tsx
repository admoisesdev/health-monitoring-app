import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { ThemedView } from "../ThemedView";

// Mock para los hooks utilizados en ThemedView
jest.mock("../../hooks", () => ({
  useThemeColor: jest.fn().mockReturnValue("#f5f5f5"),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({
    top: 20,
    bottom: 20,
    left: 0,
    right: 0,
  }),
}));

describe("Probar <ThemedView/>", () => {
  test("Debe renderizar correctamente con las propiedades por defecto", () => {
    render(
      <ThemedView>
        <Text>Contenido de la Vista</Text>
      </ThemedView>
    );

    expect(screen.getByTestId("view-container")).toBeTruthy();
  });

  test("Debe renderizar los elementos hijos correctamente", () => {
    render(
      <ThemedView>
        <Text>Elemento Hijo</Text>
      </ThemedView>
    );

    expect(screen.getByText("Elemento Hijo")).toBeTruthy();
  });

  test("Debe aplicar margen cuando 'margin' es true", () => {
    render(
      <ThemedView margin>
        <Text>Vista con margen</Text>
      </ThemedView>
    );

    const view = screen.getByTestId("view-container");
    expect(view.props.style[0].marginHorizontal).toBe(15);
  });

  test("Debe aplicar padding superior cuando 'safe' es true", () => {
    render(
      <ThemedView safe>
        <Text>Vista segura</Text>
      </ThemedView>
    );

    const view = screen.getByTestId("view-container");
    expect(view.props.style[0].paddingTop).toBe(20);
  });

  test("Debe utilizar el color de fondo proporcionado", () => {
    const customColor = "#ff0000";

    render(
      <ThemedView bgColor={customColor}>
        <Text>Vista con color personalizado</Text>
      </ThemedView>
    );

    const view = screen.getByTestId("view-container");
    expect(view.props.style[0].backgroundColor).toBe(customColor);
  });

  test("Debe renderizar KeyboardAvoidingView cuando 'keyboardAvoiding' es true", () => {
    render(
      <ThemedView keyboardAvoiding>
        <Text>Vista con teclado evitado</Text>
      </ThemedView>
    );

    expect(screen.getByText("Vista con teclado evitado")).toBeTruthy();
  });
});
