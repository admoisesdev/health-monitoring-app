import React from "react";
import { Animated, View } from "react-native";

import { useSteps } from "../hooks";
import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedButton,
  ThemedText,
  ThemedCard,
  ThemedBanner,
} from "@/presentation/theme/components";

import { Formatter } from "@/config/helpers";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const StepsCard = () => {
  const primaryColor = useThemeColor({}, "primary");
  const {
    steps,
    isSyncing,
    handleSync,
    isVisibleBanner,
    hideBanner,
    bounceTranslate,
    isAlternateIcon,
  } = useSteps();

  return (
    <>
      <View className="flex-1 justify-center">
        <ThemedBanner
          text="Sincronización exitosa con el dispositivo BLE"
          isVisible={isVisibleBanner}
          hide={hideBanner}
        />

        <ThemedCard mode="contained" style={{ marginTop: 20 }}>
          <View className="justify-center items-center gap-4">
            <Animated.View
              style={{
                transform: [{ translateY: bounceTranslate({}) }],
              }}
            >
              {isAlternateIcon ? (
                <FontAwesome5 name="running" size={60} color={primaryColor} />
              ) : (
                <FontAwesome5 name="walking" size={60} color={primaryColor} />
              )}
            </Animated.View>

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
              disabled={isSyncing || isVisibleBanner}
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
    </>
  );
};
