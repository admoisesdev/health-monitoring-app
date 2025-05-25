import { useRef, useState } from "react";
import { Animated, Easing, } from "react-native";

interface BounceTranslateParams {
  magnitude?: number;
  direction?: "up" | "down" | "left" | "right";
  extrapolate?: Animated.ExtrapolateType;
}

interface WalkingAnimationParams {
  isActive: boolean;
  duration?: number;
}

export const useAnimation = () => {
  const [isAlternateIcon, setIsAlternateIcon] = useState(false);

  const bounceAnimation = useRef(new Animated.Value(0)).current;

  const getBounceTranslate = ({
    magnitude = 5,
    direction = "up",
    extrapolate,
  }: BounceTranslateParams) => {
    let outputRange;
    switch (direction) {
      case "down":
        outputRange = [0, magnitude];
        break;
      case "left":
        outputRange = [0, -magnitude];
        break;
      case "right":
        outputRange = [0, magnitude];
        break;
      case "up":
      default:
        outputRange = [0, -magnitude];
    }

    return bounceAnimation.interpolate({
      inputRange: [0, 1],
      outputRange,
      extrapolate: extrapolate,
    });
  };

  const startWalkingAnimation = ({
    isActive = false,
    duration = 300,
  }: WalkingAnimationParams) => {
    if (isActive) {
      const interval = setInterval(() => {
        setIsAlternateIcon((prev) => !prev);
      }, duration);

      const bounceAnimationLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnimation, {
            toValue: 1,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
          }),
          Animated.timing(bounceAnimation, {
            toValue: 0,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
          }),
        ])
      );

      bounceAnimationLoop.start();

      return {
        clearInterval: () => clearInterval(interval),
        stopAnimation: () => {
          bounceAnimationLoop.stop();
          bounceAnimation.setValue(0);
        },
      };
    }

    setIsAlternateIcon(false);
    bounceAnimation.setValue(0);

    return {
      clearInterval: () => {},
      stopAnimation: () => {},
    };
  };

  return {
    isAlternateIcon,
    bounceAnimation,

    startWalkingAnimation,
    getBounceTranslate,
  };
};
