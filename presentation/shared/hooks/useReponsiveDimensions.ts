import { useWindowDimensions } from "react-native";

export type ScreenSize = "small" | "medium" | "large";

interface ResponsiveValue<T> {
  small: T;
  medium: T;
  large: T;
}

interface ResponsiveDimensions {
  width: number;
  height: number;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  screenSize: ScreenSize;
  getResponsiveValue: <T>(values: ResponsiveValue<T>) => T;
}

export const useResponsiveDimensions = (
  smallBreakpoint = 360,
  mediumBreakpoint = 400
): ResponsiveDimensions => {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = width < smallBreakpoint;
  const isMediumScreen = width >= smallBreakpoint && width < mediumBreakpoint;
  const isLargeScreen = width >= mediumBreakpoint;

  const screenSize: ScreenSize = isSmallScreen
    ? "small"
    : isMediumScreen
    ? "medium"
    : "large";

  const getResponsiveValue = <T>(values: ResponsiveValue<T>): T => {
    if (isSmallScreen) return values.small;
    if (isMediumScreen) return values.medium;
    return values.large;
  };

  return {
    width,
    height,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    screenSize,
    getResponsiveValue,
  };
};
