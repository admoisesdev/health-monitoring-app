import React from "react";
import { View } from "react-native";

import { useResponsiveDimensions } from "../hooks";
import { useProfile } from "@/presentation/user/hooks";
import { ThemedAvatar, ThemedText } from "@/presentation/theme/components";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { profile } = useProfile();
  const { getResponsiveValue, isSmallScreen } = useResponsiveDimensions();

  const avatarSize = getResponsiveValue({ small: 40, medium: 50, large: 60 });
  const headerTitleClass = isSmallScreen ? "h7" : "h3";
  const headerTextClass = isSmallScreen ? "normal" : "h4";

  return (
    <View className="flex-row items-center justify-between p-4 mt-3 bg-white shadow-md rounded-lg">
      <View className="flex-col">
        <ThemedText variant={headerTitleClass} className={"text-slate-800"}>
          {title}, <ThemedText variant="semi-bold">{profile.name}</ThemedText>
        </ThemedText>
        <ThemedText variant={headerTextClass} className="text-slate-500">
          {profile.email}
        </ThemedText>
      </View>

      <ThemedAvatar label={profile.name} size={avatarSize} />
    </View>
  );
};
