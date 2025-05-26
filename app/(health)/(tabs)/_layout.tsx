import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useColorScheme } from "@/presentation/theme/hooks";
import { useResponsiveDimensions } from "@/presentation/shared/hooks";

import { HapticTab } from "@/presentation/tabs/components";
import TabBarBackground from "@/presentation/tabs/components/TabBarBackground";

import { Colors } from "@/config/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isSmallScreen, getResponsiveValue } = useResponsiveDimensions();

  const iconSize = getResponsiveValue({ small: 20, medium: 22, large: 24 });


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: getResponsiveValue({ small: 8, medium: 10, large: 12 }),
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={iconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health-tips"
        options={{
          title: "Consejos de salud",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heartbeat" size={iconSize} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
