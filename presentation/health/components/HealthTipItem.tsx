import { StyleSheet, View } from "react-native";
import { useThemeColor } from "@/presentation/theme/hooks";

import { ThemedText } from "@/presentation/theme/components";

import { HealthTipResponse } from "@/infrastructure/interfaces";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const IconMap = {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
};

type IconLibrary = keyof typeof IconMap;

interface HealthTipItemProps {
  tip: HealthTipResponse;
}

export const HealthTipItem = ({ tip }: HealthTipItemProps) => {
  const secondaryColor = useThemeColor({}, "tertiary");
  const IconComponent = IconMap[tip.icon.library as IconLibrary];

  return (
    <View className="flex-row items-start gap-6 h-[120px] border-b border-slate-200 pb-4">
      <View className="justify-center items-center w-20 h-full">
        <IconComponent name={tip.icon.name} size={60} color={secondaryColor} />
      </View>

      <View className="flex-1 justify-center h-full">
        <ThemedText variant="h3" className="text-slate-700">
          {tip.title}
        </ThemedText>
        <ThemedText
          variant="normal"
          className="text-slate-500 w-full"
          numberOfLines={3}
        >
          {tip.description}
        </ThemedText>
      </View>
    </View>
  );
};
