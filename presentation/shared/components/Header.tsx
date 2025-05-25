import React from "react";
import { View } from "react-native";

import { useProfile } from "@/presentation/user/hooks";
import { ThemedAvatar, ThemedText } from "@/presentation/theme/components";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { profile } = useProfile();

  return (
    <View className="flex-row items-center justify-between p-4 mt-3 bg-white shadow-md rounded-lg">
      <View className="flex-col ">
        <ThemedText variant="h3" className="text-slate-800">
          {title}, <ThemedText variant="semi-bold">{profile.name}</ThemedText>
        </ThemedText>
        <ThemedText variant="normal" className="text-slate-500 text-lg">
          {profile.email}
        </ThemedText>
      </View>

      <ThemedAvatar label={profile.name} size={60} />
    </View>
  );
};
