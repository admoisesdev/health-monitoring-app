import { act, renderHook } from "@testing-library/react-native";
import { Animated } from "react-native";

import { useAnimation } from "../useAnimation";

// En lugar de hacer mock de toda la biblioteca, solo hacemos mock de los métodos específicos
// que utilizamos en el hook useAnimation
beforeEach(() => {
  jest.clearAllMocks();

  // Mock para los métodos de Animated que utilizamos
  jest.spyOn(Animated, "timing").mockImplementation(() => ({
    start: jest.fn((callback) => callback && callback({ finished: true })),
    stop: jest.fn(),
    reset: jest.fn(),
  }));

  jest.spyOn(Animated, "loop").mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
  }));

  jest
    .spyOn(Animated, "sequence")
    .mockImplementation((animations) => ({
      start: jest.fn((callback) => callback && callback({ finished: true })),
      stop: jest.fn(),
      reset: jest.fn(),
    }));

  // Simulamos el comportamiento de Animated.Value
  jest.spyOn(Animated, "Value").mockImplementation((initialValue) => {
    return {
      setValue: jest.fn(),
      interpolate: jest.fn(() => ({})),
      current: initialValue,
    } as unknown as Animated.Value;
  });
});

// Para asegurar la limpieza adecuada de los timers
afterEach(() => {
  jest.useRealTimers();
});

describe("Probar hook useAnimation", () => {
  test("Debe retornar todos los valores y funciones esperadas", () => {
    const { result } = renderHook(() => useAnimation());

    expect(result.current.animatedOpacity).toBeDefined();
    expect(result.current.fadeIn).toBeDefined();
    expect(result.current.fadeOut).toBeDefined();
    expect(result.current.isAlternateIcon).toBeDefined();
    expect(result.current.bounceAnimation).toBeDefined();
    expect(result.current.startWalkingAnimation).toBeDefined();
    expect(result.current.getBounceTranslate).toBeDefined();
  });

  test("fadeIn debe llamar a Animated.timing con los parámetros correctos", () => {
    const { result } = renderHook(() => useAnimation());

    act(() => {
      result.current.fadeIn({});
    });

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: expect.any(Function),
      })
    );
  });

  test("fadeOut debe llamar a Animated.timing con los parámetros correctos", () => {
    const { result } = renderHook(() => useAnimation());

    act(() => {
      result.current.fadeOut({});
    });

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: expect.any(Function),
      })
    );
  });

  test("getBounceTranslate debe retornar una interpolación para la dirección up por defecto", () => {
    const { result } = renderHook(() => useAnimation());
    const spy = jest.spyOn(result.current.bounceAnimation, "interpolate");

    result.current.getBounceTranslate({});

    expect(spy).toHaveBeenCalledWith({
      inputRange: [0, 1],
      outputRange: [0, -5],
      extrapolate: undefined,
    });
  });

  test("getBounceTranslate debe retornar una interpolación para diferentes direcciones", () => {
    const { result } = renderHook(() => useAnimation());
    const spy = jest.spyOn(result.current.bounceAnimation, "interpolate");

    result.current.getBounceTranslate({ direction: "down" });
    expect(spy).toHaveBeenCalledWith({
      inputRange: [0, 1],
      outputRange: [0, 5],
      extrapolate: undefined,
    });

    result.current.getBounceTranslate({ direction: "left" });
    expect(spy).toHaveBeenCalledWith({
      inputRange: [0, 1],
      outputRange: [0, -5],
      extrapolate: undefined,
    });

    result.current.getBounceTranslate({ direction: "right" });
    expect(spy).toHaveBeenCalledWith({
      inputRange: [0, 1],
      outputRange: [0, 5],
      extrapolate: undefined,
    });
  });

  test("startWalkingAnimation debe iniciar la animación cuando isActive es true", () => {
    jest.useFakeTimers();
    const { result, unmount } = renderHook(() => useAnimation());
    let controls: any;

    act(() => {
      controls = result.current.startWalkingAnimation({ isActive: true });
    });

    expect(Animated.loop).toHaveBeenCalled();

    expect(result.current.isAlternateIcon).toBe(false);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.isAlternateIcon).toBe(true);
    
    act(() => {
      controls.clearInterval();
      controls.stopAnimation();
    });
    
    unmount();
  });

  test("startWalkingAnimation debe retornar funciones para detener la animación", () => {
    const { result, unmount } = renderHook(() => useAnimation());
    const spy = jest.spyOn(result.current.bounceAnimation, "setValue");

    let controls: any;

    act(() => {
      controls = result.current.startWalkingAnimation({ isActive: true });
    });

    expect(typeof controls.clearInterval).toBe("function");
    expect(typeof controls.stopAnimation).toBe("function");

    act(() => {
      controls.stopAnimation();
      controls.clearInterval(); // Asegurarse de limpiar el intervalo
    });

    expect(spy).toHaveBeenCalledWith(0);
    
    unmount();
  });

  test("startWalkingAnimation no debe iniciar la animación cuando isActive es false", () => {
    const { result } = renderHook(() => useAnimation());
    const spy = jest.spyOn(result.current.bounceAnimation, "setValue");

    act(() => {
      result.current.startWalkingAnimation({ isActive: false });
    });

    expect(Animated.loop).not.toHaveBeenCalled();
    expect(result.current.isAlternateIcon).toBe(false);
    expect(spy).toHaveBeenCalledWith(0);
  });
});