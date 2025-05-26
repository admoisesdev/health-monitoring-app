import React from "react";
import { render } from "@testing-library/react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  useResponsiveDimensions,
  useVisibility,
} from "@/presentation/shared/hooks";
import { HealthTipItem } from "../HealthTipItem";
import { HealthTipResponse } from "@/infrastructure/interfaces";

type TextProps = {
  props: {
    children: string;
    numberOfLines?: number;
  };
};

type ButtonProps = { props: { text: string; children: string | string[] } };

// Mock de los hooks
jest.mock("@/presentation/theme/hooks", () => ({
  useThemeColor: jest.fn(),
}));

jest.mock("@/presentation/shared/hooks", () => ({
  useResponsiveDimensions: jest.fn(),
  useVisibility: jest.fn(),
}));

// Mock de componentes de tema
jest.mock("@/presentation/theme/components", () => ({
  ThemedButton: "ThemedButton",
  ThemedText: "ThemedText",
  ThemedModal: "ThemedModal",
}));

// Crear un componente de renderizado para cada tipo de icono
const createIconComponent = (name: string) => {
  const component = (props: any) => React.createElement(name, props);
  component.displayName = name;
  return component;
};

// Mock de componentes de iconos
jest.mock("@expo/vector-icons/FontAwesome", () =>
  createIconComponent("FontAwesome")
);
jest.mock("@expo/vector-icons/FontAwesome5", () =>
  createIconComponent("FontAwesome5")
);
jest.mock("@expo/vector-icons/MaterialCommunityIcons", () =>
  createIconComponent("MaterialCommunityIcons")
);
jest.mock("@expo/vector-icons/MaterialIcons", () =>
  createIconComponent("MaterialIcons")
);

describe("Probar <HealthTipItem />", () => {
  // Datos de prueba
  const mockTip: HealthTipResponse = {
    id: 1,
    title: "Mantente hidratado",
    description:
      "Bebe al menos 2 litros de agua al día para mantener tu cuerpo hidratado y funcionando correctamente.",
    icon: {
      name: "water",
      library: "FontAwesome5",
    },
  };

  // Valores predeterminados para los mocks
  const mockSecondaryColor = "#00BFA5";
  const mockTertiaryColor = "#5D9CEC";
  const mockShowModal = jest.fn();
  const mockHideModal = jest.fn();
  const mockIsVisibleModal = false;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock de useThemeColor
    (useThemeColor as jest.Mock).mockImplementation((_, theme) => {
      if (theme === "secondary") return mockSecondaryColor;
      if (theme === "tertiary") return mockTertiaryColor;
      return "#000000";
    });

    // Mock de useVisibility
    (useVisibility as jest.Mock).mockReturnValue({
      isVisible: mockIsVisibleModal,
      show: mockShowModal,
      hide: mockHideModal,
    });

    // Mock de useResponsiveDimensions para pantalla normal (no pequeña)
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      isSmallScreen: false,
    });
  });

  test("Debe renderizar correctamente con los datos proporcionados", () => {
    const { UNSAFE_root } = render(<HealthTipItem tip={mockTip} />);

    const themedTexts = UNSAFE_root.findAllByType("ThemedText");

    expect(themedTexts.length).toBeGreaterThan(0);

    const titleText = themedTexts.find(
      (text: TextProps) => text.props.children === mockTip.title
    );
    expect(titleText).toBeTruthy();

    const descriptionText = themedTexts.find(
      (text: TextProps) =>
        text.props.children === mockTip.description &&
        text.props.numberOfLines === 2
    );
    expect(descriptionText).toBeTruthy();
  });

  test("Debe mostrar el modal al hacer clic en 'Ver más'", () => {
    const { UNSAFE_root } = render(<HealthTipItem tip={mockTip} />);

    const buttons = UNSAFE_root.findAllByType("ThemedButton");

    // Si tenemos al menos un botón, usamos el primero (asumiendo que es el botón "Ver más")
    if (buttons.length > 0) {
      const verMasButton = buttons[0];

      verMasButton.props.onPress();

      expect(mockShowModal).toHaveBeenCalled();
    } else {
      // Si no hay botones, fallamos la prueba
      fail("No se encontraron botones en el componente");
    }
  });

  test("Debe cerrar el modal al hacer clic en el botón 'Cerrar'", () => {
    (useVisibility as jest.Mock).mockReturnValue({
      isVisible: true,
      show: mockShowModal,
      hide: mockHideModal,
    });

    const { UNSAFE_root } = render(<HealthTipItem tip={mockTip} />);

    const buttons = UNSAFE_root.findAllByType("ThemedButton");

    expect(buttons.length).toBeGreaterThan(0);

    // Si hay al menos dos botones, usamos el segundo (asumiendo que el primero es "Ver más" y el segundo es "Cerrar")
    if (buttons.length >= 2) {
      // Segundo botón
      const cerrarButton = buttons[1];
      cerrarButton.props.onPress();
    }
    else if (buttons.length === 1) {
      buttons[0].props.onPress();
    }

    expect(mockHideModal).toHaveBeenCalled();
  });

  test("Debe aplicar estilos responsivos según el tamaño de pantalla", () => {
    const { UNSAFE_root, unmount } = render(<HealthTipItem tip={mockTip} />);

    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    const titleText = themedTexts.find(
      (text: TextProps) => text.props.children === mockTip.title
    );
    // En pantalla normal no debe ser h7
    expect(titleText.props.variant).not.toBe("h7"); 

    unmount();

    // Ahora con pantalla pequeña
    (useResponsiveDimensions as jest.Mock).mockReturnValue({
      isSmallScreen: true,
    });

    const { UNSAFE_root: smallRoot } = render(<HealthTipItem tip={mockTip} />);

    const smallThemedTexts = smallRoot.findAllByType("ThemedText");
    const smallTitleText = smallThemedTexts.find(
      (text: TextProps) => text.props.children === mockTip.title
    );
    expect(smallTitleText.props.variant).toBe("h7");
  });

  test("ThemedModal debe recibir las props correctas", () => {
    const { UNSAFE_root } = render(<HealthTipItem tip={mockTip} />);

    // Verificar que el modal reciba las props correctas
    const modal = UNSAFE_root.findAllByType("ThemedModal")[0];
    expect(modal.props.isVisible).toBe(mockIsVisibleModal);
    expect(modal.props.hideModal).toBe(mockHideModal);
  });

  test("Debe limitar la descripción a 2 líneas en la vista principal", () => {
    const { UNSAFE_root } = render(<HealthTipItem tip={mockTip} />);

    const themedTexts = UNSAFE_root.findAllByType("ThemedText");
    const descriptionText = themedTexts.find(
      (text: TextProps) => text.props.children === mockTip.description
    );

    expect(descriptionText).toBeTruthy();
    expect(descriptionText.props.numberOfLines).toBe(2);
  });

  test("Debe mostrar la descripción completa en el modal", () => {
    (useVisibility as jest.Mock).mockReturnValue({
      isVisible: true,
      show: mockShowModal,
      hide: mockHideModal,
    });

    const { UNSAFE_root } = render(<HealthTipItem tip={mockTip} />);

    const themedTexts = UNSAFE_root.findAllByType("ThemedText");

    const modalDescriptionText = themedTexts.find(
      (text: TextProps) =>
        text.props.children === mockTip.description &&
        text.props.numberOfLines === undefined
    );

    expect(modalDescriptionText).toBeTruthy();
  });
});
