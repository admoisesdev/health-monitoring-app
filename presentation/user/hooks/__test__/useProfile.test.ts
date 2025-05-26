import { renderHook } from "@testing-library/react-native";
import { useProfile, initialProfile } from "../useProfile";

describe("Probar hook useProfile", () => {
  test("Debe retornar el perfil inicial por defecto", () => {
    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toEqual(initialProfile);
    expect(result.current.profile.name).toBe("John Doe");
    expect(result.current.profile.email).toBe("johndoe@gmail.com");
    expect(result.current.profile.age).toBe(30);
  });

  test("Debe mantener la estructura correcta del objeto retornado", () => {
    const { result } = renderHook(() => useProfile());

    expect(result.current).toHaveProperty("profile");

    expect(result.current.profile).toHaveProperty("name");
    expect(result.current.profile).toHaveProperty("email");
    expect(result.current.profile).toHaveProperty("age");
  });

  test("Debe usar el tipo UserResponse para el perfil", () => {
    const { result } = renderHook(() => useProfile());

    const profile = result.current.profile;

    expect(typeof profile.name).toBe("string");
    expect(typeof profile.email).toBe("string");
    expect(typeof profile.age).toBe("number");
  });
});
