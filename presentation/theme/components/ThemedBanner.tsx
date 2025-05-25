import React from "react";
import { View } from "react-native";
import { Banner, Icon } from "react-native-paper";

import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../hooks";

interface ThemedBannerProps {
  text: string;
  isVisible: boolean;
  hide: () => void;
  iconSource?: string;
  iconSize?: number;
  iconColor?: string;
}

export const ThemedBanner = ({
  text,
  isVisible,
  hide,
  iconSource = "check-circle",
  iconSize = 54,
  iconColor,
}: ThemedBannerProps) => {
  const succesColor = useThemeColor({}, "success");
  const secondaryColor = useThemeColor({}, "secondary");

  return (
    <Banner
      style={{
        borderRadius: 8,
        backgroundColor: "white",
      }}
      visible={isVisible}
      actions={[
        {
          label: "Cerrar",
          onPress: () => hide(),
        },
      ]}
      icon={({ size }) => (
        <View className="flex-1 items-center justify-center">
          <Icon
            source={iconSource}
            size={iconSize ?? size}
            color={iconColor ?? succesColor}
          />
        </View>
      )}
      theme={{
        colors: {
          primary: secondaryColor,
        },
        fonts: {
          labelLarge: {
            fontSize: 17,
            fontWeight: "700",
          },
        },
      }}
    >
      <ThemedText variant="h5" className="">
        {text}
      </ThemedText>
    </Banner>
  );
};
