import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/presentation/tabs/components";
import TabBarBackground from "@/presentation/tabs/components/TabBarBackground";
import { useColorScheme } from "@/presentation/theme/hooks";

import { Colors } from "@/config/constants";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
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
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health-tips"
        options={{
          title: "Consejos de salud",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heartbeat" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
