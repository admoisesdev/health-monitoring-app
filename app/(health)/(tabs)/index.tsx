import { View } from "react-native";

import { ThemedView } from "@/presentation/theme/components";
import { Header } from "@/presentation/shared/components";
import { StepsCard } from "@/presentation/steps/components";

export default function HomeScreen() {
  return (
    <ThemedView safe margin>
      <Header title="Bienvenido" />

      <View className="flex-1 justify-center">
        <StepsCard />
      </View>
    </ThemedView>
  );
}
