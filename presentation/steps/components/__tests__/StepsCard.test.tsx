import React from "react";
import { render } from "@testing-library/react-native";
import { Animated } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useResponsiveDimensions } from "@/presentation/shared/hooks";
import { useSteps } from "../../hooks";
import { StepsCard } from "../StepsCard";
import { Formatter } from "@/config/helpers";

// Mock de las dependencias
jest.mock("../../hooks", () => ({
  useSteps: jest.fn(),
}));

jest.mock("@/presentation/theme/hooks", () => ({
  useThemeColor: jest.fn(),
}));

jest.mock("@/presentation/shared/hooks", () => ({
  useResponsiveDimensions: jest.fn(),
}));

jest.mock("@/config/helpers", () => ({
  Formatter: {
    numberWithCommasAndDots: jest.fn(),
  },
}));

// Mock de FontAwesome5
jest.mock("@expo/vector-icons/FontAwesome5", () => "FontAwesome5");

// Mock de componentes de tema
jest.mock("@/presentation/theme/components", () => ({
  ThemedButton: "ThemedButton",
  ThemedText: "ThemedText",
  ThemedCard: "ThemedCard",
  ThemedBanner: "ThemedBanner",
}));


describe("Pruebas en <StepsCard />", () => {
  // Valores predeterminados para los mocks
  const mockSteps = 5432;
  const mockIsSyncing = false;
  const mockHandleSync = jest.fn();
  const mockIsVisibleBanner = false;
  const mockHideBanner = jest.fn();
  const mockBounceTranslate = jest.fn();
  const mockIsAlternateIcon = false;
  const mockPrimaryColor = "#FF5733";
  const mockFormattedSteps = "5.432";

  // Configuración para las pruebas
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock de useSteps
    (useSteps as jest.Mock).mockReturnValue({
      steps: mockSteps,
      isSyncing: mockIsSyncing,
      handleSync: mockHandleSync,
      isVisibleBanner: mockIsVisibleBanner,
      hideBanner: mockHideBanner,
      bounceTranslate: mockBounceTranslate,
      isAlternateIcon: mockIsAlternateIcon,
    });

    // Mock de useThemeColor
    (useThemeColor as jest.Mock).mockReturnValue(mockPrimaryColor);

    // Mock de useResponsiveDimensions
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.medium),
    });

    // Mock de Formatter.numberWithCommasAndDots
    (Formatter.numberWithCommasAndDots as jest.Mock).mockReturnValue(
      mockFormattedSteps
    );

    // Mock de bounceTranslate
    mockBounceTranslate.mockReturnValue(0);
  });

  test("Debe renderizar correctamente en su estado inicial", () => {
    const { UNSAFE_root } = render(<StepsCard />);

    // Verificar que el ThemedBanner tenga las props correctas
    const banner = UNSAFE_root.findAllByType("ThemedBanner")[0];
    expect(banner.props.isVisible).toBe(mockIsVisibleBanner);
    expect(banner.props.hide).toBe(mockHideBanner);

    // Verificar que se muestre el ícono correcto según isAlternateIcon
    const fontAwesome = UNSAFE_root.findAllByType("FontAwesome5")[0];
    // Porque mockIsAlternateIcon es false
    expect(fontAwesome.props.name).toBe("walking");
    expect(fontAwesome.props.color).toBe(mockPrimaryColor);

    // Verificar que se muestre el número de pasos formateado
    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    const stepsText = themedTexts.find(
      (node: { props: { children: string } }) =>
        node.props.children === mockFormattedSteps
    );
    expect(stepsText).toBeTruthy();

    // Verificar que el botón tenga las props correctas
    const button = UNSAFE_root.findAllByType("ThemedButton")[0];
    expect(button.props.disabled).toBe(mockIsSyncing || mockIsVisibleBanner);
    expect(button.props.onPress).toBe(mockHandleSync);
    expect(button.props.isLoading).toBe(mockIsSyncing);
  });

  test("Debe mostrar el ícono de running cuando isAlternateIcon es true", () => {
    // Cambiar el valor de isAlternateIcon
    (useSteps as jest.Mock).mockReturnValue({
      steps: mockSteps,
      isSyncing: mockIsSyncing,
      handleSync: mockHandleSync,
      isVisibleBanner: mockIsVisibleBanner,
      hideBanner: mockHideBanner,
      bounceTranslate: mockBounceTranslate,
      isAlternateIcon: true, // Cambiar a true
    });

    const { UNSAFE_root } = render(<StepsCard />);

    // Verificar que se muestre el ícono de running
    const fontAwesome = UNSAFE_root.findAllByType("FontAwesome5")[0];
    expect(fontAwesome.props.name).toBe("running");
  });

  test("Debe mostrar el banner cuando isVisibleBanner es true", () => {
    // Cambiar el valor de isVisibleBanner
    (useSteps as jest.Mock).mockReturnValue({
      steps: mockSteps,
      isSyncing: mockIsSyncing,
      handleSync: mockHandleSync,
      isVisibleBanner: true,
      hideBanner: mockHideBanner,
      bounceTranslate: mockBounceTranslate,
      isAlternateIcon: mockIsAlternateIcon,
    });

    const { UNSAFE_root } = render(<StepsCard />);

    // Verificar que el banner esté visible
    const banner = UNSAFE_root.findAllByType("ThemedBanner")[0];
    expect(banner.props.isVisible).toBe(true);
  });

  test("El botón debe estar deshabilitado cuando isSyncing es true", () => {
    // Cambiar el valor de isSyncing
    (useSteps as jest.Mock).mockReturnValue({
      steps: mockSteps,
      isSyncing: true,
      handleSync: mockHandleSync,
      isVisibleBanner: mockIsVisibleBanner,
      hideBanner: mockHideBanner,
      bounceTranslate: mockBounceTranslate,
      isAlternateIcon: mockIsAlternateIcon,
    });

    const { UNSAFE_root } = render(<StepsCard />);

    // Verificar que el botón esté deshabilitado
    const button = UNSAFE_root.findAllByType("ThemedButton")[0];
    expect(button.props.disabled).toBe(true);
    expect(button.props.isLoading).toBe(true);
  });

  test("El botón debe estar deshabilitado cuando isVisibleBanner es true", () => {
    // Cambiar el valor de isVisibleBanner
    (useSteps as jest.Mock).mockReturnValue({
      steps: mockSteps,
      isSyncing: mockIsSyncing,
      handleSync: mockHandleSync,
      isVisibleBanner: true,
      hideBanner: mockHideBanner,
      bounceTranslate: mockBounceTranslate,
      isAlternateIcon: mockIsAlternateIcon,
    });

    const { UNSAFE_root } = render(<StepsCard />);

    // Verificar que el botón esté deshabilitado
    const button = UNSAFE_root.findAllByType("ThemedButton")[0];
    expect(button.props.disabled).toBe(true);
  });

  test("Debe llamar a handleSync cuando se presiona el botón", () => {
    const { UNSAFE_root } = render(<StepsCard />);

    // Encontrar el botón y simular un clic
    const button = UNSAFE_root.findAllByType("ThemedButton")[0];
    button.props.onPress();

    // Verificar que se llamó a handleSync
    expect(mockHandleSync).toHaveBeenCalled();
  });

  test("Debe aplicar estilos responsivos según el tamaño de pantalla", () => {
    // Configurar mock para pantalla pequeña
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.small),
    });

    const { UNSAFE_root, unmount } = render(<StepsCard />);

    // Verificar que se aplicaron los estilos para pantalla pequeña
    const button = UNSAFE_root.findAllByType("ThemedButton")[0];
    expect(button.props.className).toContain("w-5/6");
    expect(button.props.textClassName).toBe("text-xs");

    unmount();

    // Configurar mock para pantalla grande
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.large),
    });

    const { UNSAFE_root: largeRoot } = render(<StepsCard />);

    // Verificar que se aplicaron los estilos para pantalla grande
    const largeButton = largeRoot.findAllByType("ThemedButton")[0];
    expect(largeButton.props.className).toContain("w-4/6");
    expect(largeButton.props.textClassName).toBe("text-base");
  });

  test("Debe actualizar la UI cuando cambian los pasos", () => {
    const { UNSAFE_root, rerender } = render(<StepsCard />);

    // Verificar el valor inicial de los pasos
    expect(Formatter.numberWithCommasAndDots).toHaveBeenCalledWith(mockSteps);

    // Cambiar el valor de los pasos
    const newSteps = 10000;
    const newFormattedSteps = "10.000";
    (Formatter.numberWithCommasAndDots as jest.Mock).mockReturnValue(
      newFormattedSteps
    );

    (useSteps as jest.Mock).mockReturnValue({
      steps: newSteps,
      isSyncing: mockIsSyncing,
      handleSync: mockHandleSync,
      isVisibleBanner: mockIsVisibleBanner,
      hideBanner: mockHideBanner,
      bounceTranslate: mockBounceTranslate,
      isAlternateIcon: mockIsAlternateIcon,
    });

    // Re-renderizar el componente
    rerender(<StepsCard />);

    // Verificar que se llama al formateador con el nuevo valor
    expect(Formatter.numberWithCommasAndDots).toHaveBeenCalledWith(newSteps);

    // Verificar que la UI muestra el nuevo valor formateado
    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    const stepsText = themedTexts.find(
      (node: { props: { children: string; }; }) => node.props.children === newFormattedSteps
    );
    expect(stepsText).toBeTruthy();
  });
});
