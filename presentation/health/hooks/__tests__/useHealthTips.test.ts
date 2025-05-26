import { renderHook } from "@testing-library/react-native";
import { useHealthTips, initialHealthTips } from "../useHealthTips";

describe("useHealthTips Hook", () => {
  test("Debe retornar los primeros 5 consejos de salud por defecto", () => {
    const { result } = renderHook(() => useHealthTips());

    expect(result.current.healthTips).toHaveLength(5);

    expect(result.current.healthTips).toEqual(initialHealthTips.slice(0, 5));
  });

  test("Debe mantener la estructura correcta para cada consejo de salud", () => {
    const { result } = renderHook(() => useHealthTips());

    result.current.healthTips.forEach((tip) => {
      expect(tip).toHaveProperty("id");
      expect(tip).toHaveProperty("title");
      expect(tip).toHaveProperty("description");
      expect(tip).toHaveProperty("icon");
      expect(tip.icon).toHaveProperty("name");
      expect(tip.icon).toHaveProperty("library");
    });
  });

  test("Debe mantener el orden correcto de los consejos según su ID", () => {
    const { result } = renderHook(() => useHealthTips());

    const ids = result.current.healthTips.map((tip) => tip.id);
    const sortedIds = [...ids].sort((a, b) => a - b);

    expect(ids).toEqual(sortedIds);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });

  test("Debe incluir el consejo de hidratación en la lista", () => {
    const { result } = renderHook(() => useHealthTips());

    const hydrationTip = result.current.healthTips.find(
      (tip) => tip.title === "Mantente hidratado"
    );

    expect(hydrationTip).toBeTruthy();
    expect(hydrationTip?.id).toBe(1);
    expect(hydrationTip?.description).toContain("2 litros de agua");
    expect(hydrationTip?.icon.name).toBe("water");
    expect(hydrationTip?.icon.library).toBe("FontAwesome5");
  });

  test("No debe incluir el consejo de sedentarismo (que está más allá del límite de 5)", () => {
    const { result } = renderHook(() => useHealthTips());

    const sedentaryTip = result.current.healthTips.find(
      (tip) => tip.title === "Evita el sedentarismo"
    );

    expect(sedentaryTip).toBeUndefined();
  });

  test("El objeto retornado debe tener la estructura correcta", () => {
    const { result } = renderHook(() => useHealthTips());

    expect(result.current).toHaveProperty("healthTips");

    // Verificar que no tiene propiedades adicionales inesperadas
    const keys = Object.keys(result.current);
    expect(keys).toHaveLength(1);
    expect(keys[0]).toBe("healthTips");
  });
});
