import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemedCard } from "../ThemedCard";
import { Text } from "react-native";

describe("Probar <ThemedCard/>", () => {
  test("Debe renderizar correctamente con las propiedades por defecto", () => {
    render(
      <ThemedCard>
        <Text>Contenido de la Tarjeta</Text>
      </ThemedCard>
    );

    const card = screen.getByTestId("card-container");
    expect(card).toBeTruthy();
  });

  test("Debe renderizar los elementos hijos correctamente", () => {
    render(
      <ThemedCard>
        <Text>Elemento Hijo</Text>
      </ThemedCard>
    );

    expect(screen.getByText("Elemento Hijo")).toBeTruthy();
  });
});
