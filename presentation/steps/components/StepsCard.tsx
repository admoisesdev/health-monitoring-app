import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";

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
  const { steps, isSyncing, handleSync, isVisibleBanner, hideBanner } =
    useSteps();
  const bounceAnimation = useRef(new Animated.Value(0)).current;
  const [showLeftLeg, setShowLeftLeg] = useState(false);

  // Efecto para controlar la animación de alternancia de iconos
  useEffect(() => {
    let iconChangeInterval: number;
    let bounceAnimationLoop: Animated.CompositeAnimation;

    if (isSyncing) {
      // Alternar entre piernas cada 300ms
      iconChangeInterval = setInterval(() => {
        setShowLeftLeg((prev) => !prev);
      }, 300);

      // Animación de rebote (subir y bajar)
      bounceAnimationLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
          }),
          Animated.timing(bounceAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
          }),
        ])
      );

      bounceAnimationLoop.start();
    } else {
      // Resetear el estado cuando no está sincronizando
      setShowLeftLeg(false);
      bounceAnimation.setValue(0);
    }

    // Limpiar temporizador e intervalos al desmontar
    return () => {
      if (iconChangeInterval) clearInterval(iconChangeInterval);
      if (bounceAnimationLoop) bounceAnimationLoop.stop();
    };
  }, [isSyncing, bounceAnimation]);

  // Mapear valores de animación a transformaciones
  const bounceTranslate = bounceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5], // subir 5 puntos
  });

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
                transform: [{ translateY: bounceTranslate }],
              }}
            >
              {showLeftLeg ? (
                <FontAwesome5 name="walking" size={60} color={primaryColor} />
              ) : (
                <FontAwesome5 name="running" size={60} color={primaryColor} />
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
