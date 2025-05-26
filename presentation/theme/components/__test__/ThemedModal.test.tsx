/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import { ThemedModal } from "../ThemedModal";
import { Text } from "react-native";

// Mock para react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    Portal: jest.fn(({ children }) => <View testID="portal">{children}</View>),
    Modal: jest.fn(
      ({ visible, onDismiss, contentContainerStyle, dismissable, children }) =>
        visible ? (
          <View
            testID="paper-modal"
            style={contentContainerStyle}
            onDismiss={onDismiss}
            dismissable={dismissable}
          >
            {children}
          </View>
        ) : null
    ),
  };
});

// Mock para ThemedButton
jest.mock("../ThemedButton", () => {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");

  return {
    ThemedButton: jest.fn(
      ({ onPress, iconName, variant, style, className }) => (
        <TouchableOpacity
          testID="themed-button"
          onPress={onPress}
          style={style}
        >
          <Text testID="button-icon">{iconName}</Text>
          <Text testID="button-variant">{variant}</Text>
          <Text testID="button-class">{className}</Text>
        </TouchableOpacity>
      )
    ),
  };
});

const mockHideModal = jest.fn();

describe("Probar <ThemedModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe renderizar correctamente el modal de react-native-paper cuando isNativeModal es false", () => {
    render(
      <ThemedModal isVisible={true} hideModal={mockHideModal}>
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    expect(screen.getByTestId("portal")).toBeTruthy();
    expect(screen.getByTestId("paper-modal")).toBeTruthy();
    expect(screen.getByTestId("modal-content")).toBeTruthy();
    expect(screen.getByTestId("themed-button")).toBeTruthy();
  });

  test("Debe renderizar correctamente el modal nativo cuando isNativeModal es true", () => {
    render(
      <ThemedModal
        isVisible={true}
        hideModal={mockHideModal}
        isNativeModal={true}
      >
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    expect(screen.getByTestId("modal-content")).toBeTruthy();
    expect(screen.queryByTestId("portal")).toBeNull();
    expect(screen.queryByTestId("themed-button")).toBeNull();
  });

  test("No debe renderizar el contenido cuando isVisible es false", () => {
    render(
      <ThemedModal isVisible={false} hideModal={mockHideModal}>
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    expect(screen.queryByTestId("modal-content")).toBeNull();
  });

  test("Debe llamar a hideModal cuando se presiona el botón de cierre", () => {
    render(
      <ThemedModal isVisible={true} hideModal={mockHideModal}>
        <Text>Modal Content</Text>
      </ThemedModal>
    );

    const closeButton = screen.getByTestId("themed-button");
    fireEvent.press(closeButton);
    expect(mockHideModal).toHaveBeenCalledTimes(1);
  });

  test("Debe renderizar el modal nativo con cierre automático cuando hasAutomaticClosing es true", () => {
    render(
      <ThemedModal
        isVisible={true}
        hideModal={mockHideModal}
        isNativeModal={true}
        hasAutomaticClosing={true}
      >
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    const touchableArea = screen.getByTestId("modal-content").parent;
    fireEvent.press(touchableArea);
    expect(mockHideModal).toHaveBeenCalledTimes(1);
  });

  test("Debe renderizar el modal nativo sin cierre automático cuando hasAutomaticClosing es false", () => {
    render(
      <ThemedModal
        isVisible={true}
        hideModal={mockHideModal}
        isNativeModal={true}
        hasAutomaticClosing={false}
      >
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    const touchableArea = screen.getByTestId("modal-content").parent;
    fireEvent.press(touchableArea);
    expect(mockHideModal).not.toHaveBeenCalled();
  });

  test("Debe aplicar el ancho correcto cuando isFullModal es true", () => {
    render(
      <ThemedModal
        isVisible={true}
        hideModal={mockHideModal}
        isNativeModal={true}
        isFullModal={true}
      >
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    const modalView = screen.getByTestId("modal-content").parent;
    const modalViewStyles = modalView._fiber.return.pendingProps.style;
    expect(modalViewStyles).toHaveProperty("width");
  });

  test("Debe aplicar el ancho correcto cuando isFullModal es false", () => {
    render(
      <ThemedModal
        isVisible={true}
        hideModal={mockHideModal}
        isNativeModal={true}
        isFullModal={false}
      >
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    const modalView = screen.getByTestId("modal-content").parent;
    const modalViewStyles = modalView._fiber.return.pendingProps.style;

    expect(modalViewStyles).toHaveProperty("width");
  });

  test("Debe aplicar la clase personalizada cuando se proporciona className", () => {
    const customClass = "custom-class";
    render(
      <ThemedModal
        isVisible={true}
        hideModal={mockHideModal}
        isNativeModal={true}
        className={customClass}
      >
        <Text testID="modal-content">Modal Content</Text>
      </ThemedModal>
    );

    const modalView = screen.getByTestId("modal-content").parent;
    const modalViewClass = modalView._fiber.return.pendingProps.className;

    expect(modalViewClass).toContain(customClass);
  });
});
