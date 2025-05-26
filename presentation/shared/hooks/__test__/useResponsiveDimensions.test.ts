import { renderHook } from "@testing-library/react-native";
import * as ReactNative from "react-native";
import { useResponsiveDimensions } from "../useReponsiveDimensions";

// En lugar de hacer mock de todo el módulo, solo hacemos mock de la función específica
const mockUseWindowDimensions = jest.fn();
jest
  .spyOn(ReactNative, "useWindowDimensions")
  .mockImplementation(mockUseWindowDimensions);

describe("Probar hook useResponsiveDimensions", () => {
  // Asegurarse de que el mock se limpie antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getResponsiveValue debe funcionar con diferentes tipos de datos", () => {
    mockUseWindowDimensions.mockReturnValue({
      width: 450, // Pantalla grande
      height: 800,
    });

    const { result } = renderHook(() => useResponsiveDimensions());

    expect(
      result.current.getResponsiveValue({
        small: "pequeño",
        medium: "mediano",
        large: "grande",
      })
    ).toBe("grande");

    // Prueba con números
    expect(
      result.current.getResponsiveValue({
        small: 10,
        medium: 20,
        large: 30,
      })
    ).toBe(30);

    const smallObj = { value: "small" };
    const mediumObj = { value: "medium" };
    const largeObj = { value: "large" };

    expect(
      result.current.getResponsiveValue({
        small: smallObj,
        medium: mediumObj,
        large: largeObj,
      })
    ).toBe(largeObj);
  });
});
