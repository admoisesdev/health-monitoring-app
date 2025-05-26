export class Formatter {
  static initialLetters(name: string, limit?: number): string {
    const names = name
      .trim()
      .split(/\s+/)
      .filter((n) => n.length > 0);

    if (!limit || limit > names.length) {
      return names.map((n) => n.charAt(0).toLocaleUpperCase()).join("");
    }

    const firstPart = names.slice(0, limit - 1).join(" ");
    const lastInitial = names[limit - 1].charAt(0).toUpperCase() + ".";

    return firstPart + (firstPart ? " " : "") + lastInitial;
  }

  static numberWithCommasAndDots(number: number | string): string {
    if (!number) return "0";

    if (typeof number === "string") {
      number = parseFloat(number);
    }
    
    return number.toLocaleString("es-ES");
  }
}