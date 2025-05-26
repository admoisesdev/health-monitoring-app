import { Timer } from "../timer";

describe("Probar helper Timer", () => {
  // Configurar jest para usar temporizadores falsos
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Restaurar configuración original después de cada prueba
  afterEach(() => {
    jest.useRealTimers();
  });

  test("sleep debe resolver después del tiempo especificado", async () => {
    const sleepPromise = Timer.sleep(1000);

    // Creamos un mock para verificar si la promesa se ha resuelto
    const mockCallback = jest.fn();
    sleepPromise.then(mockCallback);

    // Verificar que el callback no ha sido llamado (la promesa no se ha resuelto)
    expect(mockCallback).not.toHaveBeenCalled();

    // Avanzar el tiempo menos de lo necesario
    jest.advanceTimersByTime(500);

    // Ejecutar cualquier callback pendiente
    jest.runAllTimers();

    // Verificar que el callback aún no ha sido llamado
    expect(mockCallback).not.toHaveBeenCalled();

    // Avanzar el tiempo lo suficiente para que se resuelva
    jest.advanceTimersByTime(500);

    // Ejecutar cualquier callback pendiente
    jest.runAllTimers();

    // Esperar a que la promesa se resuelva
    await Promise.resolve();

    // Ahora el callback debe haber sido llamado
    expect(mockCallback).toHaveBeenCalled();
  });

  test("sleep debe usar el valor predeterminado de 2000ms si no se especifica", async () => {
    // Limpiar cualquier llamada previa a setTimeout
    jest.clearAllTimers();

    const spySetTimeout = jest.spyOn(global, "setTimeout");

    const sleepPromise = Timer.sleep();

    expect(spySetTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);

    const mockCallback = jest.fn();
    sleepPromise.then(mockCallback);

    // Avanzar el tiempo pero no lo suficiente para que se complete
    jest.advanceTimersByTime(1500);

    // Verificar que el callback no ha sido llamado todavía
    expect(mockCallback).not.toHaveBeenCalled();

    // Avanzar el tiempo hasta completar los 2000ms
    jest.advanceTimersByTime(500);

    // Ejecutar cualquier callback pendiente
    jest.runOnlyPendingTimers();

    // Esperar a que la promesa se resuelva
    await Promise.resolve();

    // Ahora el callback debe haber sido llamado
    expect(mockCallback).toHaveBeenCalled();
  });

  test("sleep debe funcionar con diferentes valores de tiempo", async () => {
    // Probar con diferentes tiempos
    const times = [100, 500, 1000, 3000];

    for (const time of times) {
      const sleepPromise = Timer.sleep(time);
      const mockCallback = jest.fn();
      sleepPromise.then(mockCallback);

      jest.advanceTimersByTime(time);
      jest.runAllTimers();
      await Promise.resolve();

      expect(mockCallback).toHaveBeenCalled();

      mockCallback.mockClear();
    }
  });

  test("sleep debe llamar a setTimeout con el tiempo correcto", () => {
    const spySetTimeout = jest.spyOn(global, "setTimeout");

    Timer.sleep(1500);

    expect(spySetTimeout).toHaveBeenCalledWith(expect.any(Function), 1500);

    Timer.sleep();

    expect(spySetTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
  });
});
