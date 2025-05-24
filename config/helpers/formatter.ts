export class Formatter {
  static initialLetters(name: string, limit?: number): string {
    const names = name.split(" ");

    if (!limit || limit > names.length) {
      return names.map((n) => n.charAt(0).toLocaleUpperCase()).join("");
    }

    const limitedNames = names.slice(0, limit);
    return limitedNames
      .map((n, index) => {
        if (index === limitedNames.length - 1) {
          return n.charAt(0).toLocaleUpperCase() + ".";
        }
        return n;
      })
      .join(" ");
  }
}