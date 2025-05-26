import { Formatter } from "../formatter";

describe("Probar helper Formatter", () => {
  describe("Probar initialLetters", () => {
    test("Debe retornar las iniciales de un nombre completo", () => {
      expect(Formatter.initialLetters("John Doe")).toBe("JD");
      expect(Formatter.initialLetters("Ana María Rodríguez")).toBe("AMR");
      expect(Formatter.initialLetters("Carlos Alberto Pérez González")).toBe("CAPG");
    });

    test("Debe manejar nombres de una sola palabra", () => {
      expect(Formatter.initialLetters("John")).toBe("J");
      expect(Formatter.initialLetters("María")).toBe("M");
    });

    test("Debe respetar el límite especificado", () => {
      expect(Formatter.initialLetters("John Doe Smith", 2)).toBe("John D.");
      expect(Formatter.initialLetters("Ana María Rodríguez", 1)).toBe("A.");
      expect(Formatter.initialLetters("Carlos Alberto Pérez González", 3)).toBe("Carlos Alberto P.");
    });

    test("Debe manejar correctamente cuando el límite es mayor que el número de palabras", () => {
      expect(Formatter.initialLetters("John Doe", 3)).toBe("JD");
      expect(Formatter.initialLetters("Ana María", 5)).toBe("AM");
    });

    test("Debe manejar nombres con espacios adicionales", () => {
      expect(Formatter.initialLetters("  John   Doe  ")).toBe("JD");
      expect(Formatter.initialLetters(" Ana  María ")).toBe("AM");
    });

    test("Debe manejar cadenas vacías", () => {
      expect(Formatter.initialLetters("")).toBe("");
    });
  });

  describe("Probar numberWithCommasAndDots", () => {
    test("Debe manejar cero correctamente", () => {
      expect(Formatter.numberWithCommasAndDots(0)).toBe("0");
      expect(Formatter.numberWithCommasAndDots("0")).toBe("0");
    });

    test("Debe manejar valores nulos o indefinidos retornando '0'", () => {
      expect(Formatter.numberWithCommasAndDots(null as any)).toBe("0");
      expect(Formatter.numberWithCommasAndDots(undefined as any)).toBe("0");
      expect(Formatter.numberWithCommasAndDots("")).toBe("0");
    });

    test("Debe manejar strings no numéricas", () => {
      // Debería intentar convertir a número, y si no puede, parseFloat retornará NaN
      expect(Formatter.numberWithCommasAndDots("abc" as any)).toBe("NaN");
    });

    test("Debe manejar números grandes", () => {
      expect(Formatter.numberWithCommasAndDots(1000000000)).toBe("1.000.000.000");
      expect(Formatter.numberWithCommasAndDots("1000000000")).toBe("1.000.000.000");
    });
  });
});