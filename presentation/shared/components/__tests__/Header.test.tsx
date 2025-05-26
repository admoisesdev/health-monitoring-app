import React from "react";
import { render } from "@testing-library/react-native";
import { Header } from "../Header";
import { useProfile } from "@/presentation/user/hooks";
import { useResponsiveDimensions } from "../../hooks";

// Mock de los hooks
jest.mock("@/presentation/user/hooks", () => ({
  useProfile: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  useResponsiveDimensions: jest.fn(),
}));

// Mock de los componentes de tema
jest.mock("@/presentation/theme/components", () => {
  return {
    ThemedText: "ThemedText",
    ThemedAvatar: "ThemedAvatar",
  };
});

describe("Probar <Header/>", () => {
  // Valores de mock comunes
  const mockProfile = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock por defecto para useProfile
    (useProfile as jest.Mock).mockReturnValue({
      profile: mockProfile,
    });

    // Mock por defecto para useResponsiveDimensions
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.medium),
      isSmallScreen: false,
    });
  });

  // Limpiar después de cada test para evitar fugas de memoria
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe renderizar con el título y datos de perfil correctos", () => {
    const { UNSAFE_root } = render(<Header title="Bienvenido" />);

    const themedTexts = UNSAFE_root.findAllByType("ThemedText");

    // Verificar el título
    expect(themedTexts[0].props.children[0]).toBe("Bienvenido");

    // Verificar el nombre y email del perfil
    expect(themedTexts[1].props.children).toBe("John Doe");
  });

  test("Debe ajustar estilos para pantalla pequeña", () => {
    // Configurar mock para pantalla pequeña
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.small),
      isSmallScreen: true,
    });

    const { UNSAFE_root } = render(<Header title="Bienvenido" />);

    // Usar el método findAll del nodo raíz
    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    expect(themedTexts[0].props.variant).toBe("h7");

    // Verificar el tamaño del avatar
    const avatars = UNSAFE_root.findAllByType("ThemedAvatar");
    expect(avatars[0].props.size).toBe(40); // Valor para pantalla pequeña
  });

  test("Debe ajustar estilos para pantalla mediana", () => {
    // Configurar mock para pantalla mediana
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.medium),
      isSmallScreen: false,
    });

    const { UNSAFE_root } = render(<Header title="Bienvenido" />);

    // Usar el método findAll del nodo raíz
    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    expect(themedTexts[0].props.variant).toBe("h3");

    // Verificar el tamaño del avatar
    const avatars = UNSAFE_root.findAllByType("ThemedAvatar");
    expect(avatars[0].props.size).toBe(50); // Valor para pantalla mediana
  });

  test("Debe ajustar estilos para pantalla grande", () => {
    // Configurar mock para pantalla grande
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      getResponsiveValue: jest.fn((values) => values.large),
      isSmallScreen: false,
    });

    const { UNSAFE_root } = render(<Header title="Bienvenido" />);

    // Verificar el tamaño del avatar
    const avatars = UNSAFE_root.findAllByType("ThemedAvatar");
    expect(avatars[0].props.size).toBe(60);
  });

  test("Debe mostrar correctamente diferentes títulos", () => {
    const { unmount, UNSAFE_root } = render(<Header title="Bienvenido" />);

    // Verificar el título
    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    expect(themedTexts[0].props.children[0]).toBe("Bienvenido");

    unmount();

    const { UNSAFE_root: newRoot } = render(<Header title="Dashboard" />);

    // Verificar el nuevo título
    const newThemedTexts = newRoot.findAllByType("ThemedText");
    expect(newThemedTexts[0].props.children[0]).toBe("Dashboard");
  });

  test("Debe mostrar correctamente diferentes perfiles", () => {
    // Cambiar el perfil mock
    (useProfile as jest.Mock).mockReturnValue({
      profile: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
    });

    const { UNSAFE_root } = render(<Header title="Bienvenido" />);

    // Verificar usando findAllByType
    const themedTexts = UNSAFE_root.findAllByType("ThemedText");

    // Verificar nombre (ThemedText anidado)
    expect(themedTexts[1].props.children).toBe("Jane Smith");

    // Verificar email
    expect(themedTexts[2].props.children).toBe("jane.smith@example.com");
  });
});
