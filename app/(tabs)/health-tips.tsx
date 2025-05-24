import { ThemedText, ThemedView } from "@/presentation/theme/components";
import { Header } from "@/presentation/shared/components";

export default function HealthTipsScreen() {
  return (
    <ThemedView safe>
      <Header title="Bienvenido" />
      <ThemedText className="text-2xl font-bold text-center">
        Bienvenido a la sección de consejos de salud. Aquí encontrarás
        información útil y consejos prácticos para mantener un estilo de vida
        saludable.
      </ThemedText>
    </ThemedView>
  );
}
