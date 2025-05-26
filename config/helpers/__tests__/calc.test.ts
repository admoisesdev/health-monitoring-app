import { Calc } from "../calc";

describe("Probar helper Calc", () => {
  describe("Probar getRandomNumber", () => { 
    test("getRandomNumber debería generar un número dentro del rango especificado", () => {
      const min = 5;
      const max = 10;

      const randomNumber = Calc.getRandomNumber(min, max);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    });

    test("getRandomNumber debería funcionar con rangos negativos", () => {
      const min = -10;
      const max = -5;

      const randomNumber = Calc.getRandomNumber(min, max);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    });

    test("getRandomNumber debería funcionar con rango mixto (negativo a positivo)", () => {
      const min = -5;
      const max = 5;

      const randomNumber = Calc.getRandomNumber(min, max);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    });

    test("getRandomNumber debería retornar el mismo valor si min y max son iguales", () => {
      const value = 7;

      const randomNumber = Calc.getRandomNumber(value, value);

      expect(randomNumber).toBe(value);
    });

    test("getRandomNumber debería retornar un número entero", () => {
      const randomNumber = Calc.getRandomNumber(1, 100);

      expect(Number.isInteger(randomNumber)).toBe(true);
    });
  });
});
