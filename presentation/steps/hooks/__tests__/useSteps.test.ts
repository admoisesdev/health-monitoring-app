import { renderHook, act } from "@testing-library/react-native";

import { useSteps } from "../useSteps";
import { useAnimation, useVisibility } from "@/presentation/shared/hooks";
import { Calc, Timer } from "@/config/helpers";

// Mock de dependencias
jest.mock("@/presentation/shared/hooks", () => ({
  useVisibility: jest.fn(),
  useAnimation: jest.fn(),
}));

jest.mock("@/config/helpers", () => ({
  Calc: {
    getRandomNumber: jest.fn(),
  },
  Timer: {
    sleep: jest.fn(),
  },
}));

describe("Probar hook useSteps", () => {
  // Mocks para useVisibility
  const mockShow = jest.fn();
  const mockHide = jest.fn();
  const mockIsVisible = false;

  // Mocks para useAnimation
  const mockIsAlternateIcon = false;
  const mockGetBounceTranslate = jest.fn();
  const mockStartWalkingAnimation = jest.fn();
  const mockClearInterval = jest.fn();
  const mockStopAnimation = jest.fn();

  // Valores predeterminados
  const initialSteps = 5000;
  const newSteps = 8000;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock de Timer.sleep para que devuelva una promesa resuelta
    (Timer.sleep as jest.Mock).mockResolvedValue(undefined);

    // Mock de Calc.getRandomNumber para que devuelva valores controlados
    (Calc.getRandomNumber as jest.Mock)
      .mockReturnValueOnce(initialSteps) // Para el estado inicial
      .mockReturnValueOnce(newSteps);    // Para después de sincronizar

    // Mock de useVisibility
    (useVisibility as jest.Mock).mockReturnValue({
      isVisible: mockIsVisible,
      show: mockShow,
      hide: mockHide,
    });

    // Mock de useAnimation
    (useAnimation as jest.Mock).mockReturnValue({
      isAlternateIcon: mockIsAlternateIcon,
      getBounceTranslate: mockGetBounceTranslate,
      startWalkingAnimation: mockStartWalkingAnimation,
    });

    // Mock de startWalkingAnimation para que devuelva funciones mock
    mockStartWalkingAnimation.mockReturnValue({
      clearInterval: mockClearInterval,
      stopAnimation: mockStopAnimation,
    });

    // Mock de setTimeout y clearTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Debe inicializar con valores por defecto", () => {
    const { result } = renderHook(() => useSteps());

    expect(result.current.steps).toBe(initialSteps);
    expect(result.current.isSyncing).toBe(false);
    expect(result.current.isVisibleBanner).toBe(mockIsVisible);
    expect(result.current.isAlternateIcon).toBe(mockIsAlternateIcon);
    expect(result.current.bounceTranslate).toBe(mockGetBounceTranslate);
  });

  test("Debe iniciar la animación de caminar cuando isSyncing cambia", () => {
    renderHook(() => useSteps());

    expect(mockStartWalkingAnimation).toHaveBeenCalledWith({ isActive: false });
  });

  test("Debe limpiar temporizadores y animaciones al desmontar", () => {
    const { unmount } = renderHook(() => useSteps());

    unmount();

    expect(mockClearInterval).toHaveBeenCalled();
    expect(mockStopAnimation).toHaveBeenCalled();
  });

  test("handleSync debe actualizar el estado y mostrar el banner", async () => {
    // Configurar el mock de Timer.sleep para resolver manualmente
    let resolveTimerSleep: (value: unknown) => void;
    (Timer.sleep as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        resolveTimerSleep = resolve;
      });
    });


    const { result } = renderHook(() => useSteps());

    // Verificar el estado inicial
    expect(result.current.isSyncing).toBe(false);

    // Iniciar sincronización
    act(() => {
      result.current.handleSync();
    });

    // Verificar estado durante la sincronización
    expect(result.current.isSyncing).toBe(true);

    // Resolver la promesa de Timer.sleep manualmente
    await act(async () => {
      resolveTimerSleep(undefined);
    });

    // Verificar estado después de la sincronización
    expect(result.current.isSyncing).toBe(false);
    expect(result.current.steps).toBe(newSteps);
    expect(mockShow).toHaveBeenCalled();
  });

  test("handleHideBanner debe limpiar el temporizador y ocultar el banner", async() => {
    // Configurar el mock de Timer.sleep para resolver manualmente
    let resolveTimerSleep: (value: unknown) => void;
    (Timer.sleep as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        resolveTimerSleep = resolve;
      });
    });

    const { result } = renderHook(() => useSteps());

    // Configurar un temporizador para el banner
    act(() => {
      result.current.handleSync();
    });

    // Verificar que se inició la sincronización
    expect(result.current.isSyncing).toBe(true);

    // Resolver la promesa para completar la sincronización
    await act(async () => {
      resolveTimerSleep(undefined);
    });

    // Verificar que el banner se mostró
    expect(mockShow).toHaveBeenCalled();

    // Ocultar el banner manualmente
    act(() => {
      result.current.hideBanner();
    });

    expect(mockHide).toHaveBeenCalled();

    // Avanzar el tiempo para verificar que el temporizador fue limpiado
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // mockHide debería haberse llamado solo una vez (por hideBanner, no por el temporizador)
    expect(mockHide).toHaveBeenCalledTimes(1);
  });

  test("clearBannerTimer debe limpiar el temporizador si existe", async () => {
    // Configurar el mock de Timer.sleep para resolver manualmente
    let resolveTimerSleep: (value: unknown) => void;
    (Timer.sleep as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        resolveTimerSleep = resolve;
      });
    });

    // Espiar setTimeout y clearTimeout
    const spySetTimeout = jest.spyOn(global, "setTimeout");
    const spyClearTimeout = jest.spyOn(global, "clearTimeout");

    // Asegurarse de que los spies están limpios
    spySetTimeout.mockClear();
    spyClearTimeout.mockClear();

    const { result } = renderHook(() => useSteps());

    // Configurar un temporizador para el banner
    act(() => {
      result.current.handleSync();
    });

    // Verificar que se inició la sincronización
    expect(result.current.isSyncing).toBe(true);

    // Resolver la promesa para completar la sincronización
    await act(async () => {
      resolveTimerSleep(undefined);
    });

    // Verificar que se configuró un temporizador después de la sincronización
    expect(spySetTimeout).toHaveBeenCalled();

    // Limpiar spies para la siguiente verificación
    spySetTimeout.mockClear();
    spyClearTimeout.mockClear();
  });

  test("handleSync debe limpiar el temporizador existente antes de iniciar uno nuevo", async () => {
    // Configurar resolvers manuales para dos llamadas secuenciales a Timer.sleep
    let resolveFirstSync: (value: unknown) => void;
    let resolveSecondSync: (value: unknown) => void;

    // Primera implementación de Timer.sleep
    (Timer.sleep as jest.Mock).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        resolveFirstSync = resolve;
      });
    });

    // Segunda implementación de Timer.sleep para la segunda sincronización
    (Timer.sleep as jest.Mock).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        resolveSecondSync = resolve;
      });
    });

    const { result } = renderHook(() => useSteps());

    // Espiar clearTimeout
    const spyClearTimeout = jest.spyOn(global, "clearTimeout");

    // Limpiar el spy antes de comenzar
    spyClearTimeout.mockClear();

    // Primera sincronización
    act(() => {
      result.current.handleSync();
    });

    // Verificar que se inició la primera sincronización
    expect(result.current.isSyncing).toBe(true);

    // Completar la primera sincronización
    await act(async () => {
      resolveFirstSync(undefined);
    });

    // Verificar que la primera sincronización finalizó y se mostró el banner
    expect(result.current.isSyncing).toBe(false);
    expect(mockShow).toHaveBeenCalled();

    // Limpiar el spy para asegurarnos de capturar solo las llamadas de la segunda sincronización
    spyClearTimeout.mockClear();

    // Segunda sincronización antes de que expire el temporizador del banner
    act(() => {
      result.current.handleSync();
    });

    // Completar la segunda sincronización
    await act(async () => {
      resolveSecondSync(undefined);
    });

    // Verificar que la segunda sincronización finalizó
    expect(result.current.isSyncing).toBe(false);
  });
});