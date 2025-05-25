import { View } from "react-native";

import { Header } from "@/presentation/shared/components";
import { ThemedView } from "@/presentation/theme/components";
import { StepsCard } from "@/presentation/steps/components";


export default function HomeScreen() {
  return (
    <ThemedView safe>
      <Header title="Bienvenido" />

      <View className="flex-1 justify-center w-[95%] mx-auto">
        <StepsCard />
      </View>
    </ThemedView>
  );
}
