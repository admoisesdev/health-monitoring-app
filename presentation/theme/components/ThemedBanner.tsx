import React from "react";
import { View } from "react-native";
import { Banner, Icon } from "react-native-paper";

import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../hooks";
import { useResponsiveDimensions } from "@/presentation/shared/hooks";

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
  iconSize,
  iconColor,
}: ThemedBannerProps) => {
  const succesColor = useThemeColor({}, "success");
  const secondaryColor = useThemeColor({}, "secondary");
  const { isSmallScreen, getResponsiveValue } = useResponsiveDimensions();

  const responsiveIconSize = getResponsiveValue({
    small: 36,
    medium: 44,
    large: 54,
  });

  const finalIconSize = iconSize ?? responsiveIconSize;
  const textVariant = isSmallScreen ? "h7" : "h5";
  const buttonFontSize = getResponsiveValue({ small: 14, medium: 15, large: 17 });

  return (
    <Banner
      style={{
        borderRadius: 8,
        backgroundColor: "white",
        padding: isSmallScreen ? 8 : 12,
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
            size={finalIconSize}
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
            fontSize: buttonFontSize,
            fontWeight: "700",
          },
        },
      }}
    >
      <ThemedText variant={textVariant} className="text-slate-700">
        {text}
      </ThemedText>
    </Banner>
  );
};
