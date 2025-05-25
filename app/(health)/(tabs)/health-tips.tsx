import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import { useHealthTips } from "@/presentation/health/hooks";

import { ThemedCard, ThemedText, ThemedView } from "@/presentation/theme/components";
import { Header } from "@/presentation/shared/components";
import { HealthTipItem } from "@/presentation/health/components";


export default function HealthTipsScreen() {
  const {healthTips} = useHealthTips();

  return (
    <ThemedView safe margin>
      <Header title="Bienvenido" />

      <View className="flex-1 justify-center my-5">
        <ThemedCard
          mode="contained"
          style={{ paddingVertical: 5, paddingHorizontal: 0 }}
        >
          <FlatList
            ListHeaderComponent={() => (
              <View>
                <ThemedText variant="h2" className="text-slate-800 mb-1">
                  Consejos de salud
                </ThemedText>
                <ThemedText className="text-slate-500">
                  Aquí tienes algunos consejos para mejorar tu salud y bienestar:
                </ThemedText>
              </View>
            )}
            contentContainerStyle={styles.tipsList}
            data={healthTips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HealthTipItem tip={item} />}
            showsVerticalScrollIndicator={false}
          />
        </ThemedCard>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tipsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
});
