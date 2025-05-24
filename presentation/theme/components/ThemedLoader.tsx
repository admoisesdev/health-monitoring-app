import React from "react";
import { ActivityIndicator } from "react-native-paper";

interface ThemedLoaderProps {
  color: string;
  size?: "small" | "large";
}

export const ThemedLoader = ({ color, size }: ThemedLoaderProps) => {
  return <ActivityIndicator color={color} size={size} className="mx-auto" />;
};
