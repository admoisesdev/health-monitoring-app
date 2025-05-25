import React from "react";
import { View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedButton,
  ThemedText,
  ThemedCard,
  ThemedBanner,
} from "@/presentation/theme/components";

import { Formatter } from "@/config/helpers";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSteps } from "../hooks";


export const StepsCard = () => {
  const primaryColor = useThemeColor({}, "primary");
  const {steps,isSyncing,handleSync,isVisibleBanner,hideBanner} = useSteps();
  
  return (
    <View className="flex-1 justify-center gap-4">
      <ThemedBanner
        text="Sincronización exitosa con el dispositivo BLE"
        isVisible={isVisibleBanner}
        hide={hideBanner}
      />

      <ThemedCard mode="contained">
        <View className="justify-center items-center gap-4">
          <FontAwesome5 name="walking" size={60} color={primaryColor} />

          <View className="flex-col justify-center items-center">
            <ThemedText variant="h1" className="font-bold text-slate-700">
              {Formatter.numberWithCommasAndDots(steps)}
            </ThemedText>
            <ThemedText variant="h4" className="font-semibold text-slate-500">
              Pasos
            </ThemedText>
          </View>

          <ThemedButton
            variant="rounded"
            className="bg-slate-800 w-4/6"
            disabled={isSyncing}
            onPress={handleSync}
            text="Sincronizar dispositivo"
            iconName="sync"
            iconColor="white"
            iconSize={24}
            isLoading={isSyncing}
            loadingText="Sincronizando..."
          />
        </View>
      </ThemedCard>
    </View>
  );
};
