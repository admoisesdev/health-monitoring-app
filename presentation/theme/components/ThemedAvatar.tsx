import React from "react";
import { Avatar } from "react-native-paper";

import { useThemeColor } from "../hooks";
import { Formatter } from "@/config/helpers";

interface ThemedAvatarProps {
  label: string;
  size?: number;
  color?: string;
  bgColor?: string;
}

export const ThemedAvatar = ({
  label,
  size = 64,
  color,
  bgColor,
}: ThemedAvatarProps) => {
  const secondaryColor = useThemeColor({}, "secondary");

  return (
    <Avatar.Text
      size={size}
      label={Formatter.initialLetters(label)}
      color={color ? color : "white"}
      theme={{
        colors: {
          primary: bgColor ? bgColor : secondaryColor,
        },
      }}
      labelStyle={{
        fontSize: size / 3,
        letterSpacing: 2,
        textTransform: "uppercase",
        fontWeight: "semibold",
      }}
    />
  );
};
