import { View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useResponsiveDimensions, useVisibility } from "@/presentation/shared/hooks";

import { ThemedButton, ThemedText,ThemedModal } from "@/presentation/theme/components";
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
  const secondaryColor = useThemeColor({}, "secondary");
  const tertiaryColor = useThemeColor({}, "tertiary");

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();
  const { isSmallScreen } = useResponsiveDimensions();

  const titleVariant = isSmallScreen ? "h7" : "h3";
  const descriptionVariant = isSmallScreen ? "normal" : "h6";
  const iconSize = isSmallScreen ? 50 : 60;
  const linkButtonText = isSmallScreen ? "text-xs" : "text-base";
  const titleModal = isSmallScreen ? "h5" : "h2";
  const buttonCloseModal = isSmallScreen ? "text-xs" : "text-base";

  const IconComponent = IconMap[tip.icon.library as IconLibrary];

  return (
    <>
      <View className="flex-row items-start gap-3 h-[120px] border-b border-slate-200 pb-4">
        <View className="justify-center items-center w-20 h-3/4">
          <IconComponent
            name={tip.icon.name}
            size={iconSize}
            color={tertiaryColor}
          />
        </View>

        <View className="flex-1 justify-center h-full my-2">
          <ThemedText variant={titleVariant} className="text-slate-700">
            {tip.title}
          </ThemedText>
          <ThemedText
            variant={descriptionVariant}
            className="text-slate-500 w-full"
            numberOfLines={2}
          >
            {tip.description}
          </ThemedText>
          <ThemedButton onPress={showModal} className="self-end px-0 py-1">
            <ThemedText
              variant="link"
              className={`text-slate-600 ${linkButtonText}`}
            >
              Ver más
            </ThemedText>
          </ThemedButton>
        </View>
      </View>

      <ThemedModal
        isVisible={isVisibleModal}
        hideModal={hideModal}
        // isNativeModal
      >
        <View className="items-center">
          <View className="mb-6 items-center">
            <IconComponent
              name={tip.icon.name}
              size={80}
              color={secondaryColor}
            />
          </View>

          <ThemedText
            variant={titleModal}
            className="text-slate-700 text-center mb-4"
          >
            {tip.title}
          </ThemedText>

          <ThemedText
            variant={descriptionVariant}
            className="text-slate-600 text-center mb-6"
          >
            {tip.description}
          </ThemedText>

          <ThemedButton
            onPress={hideModal}
            className="bg-slate-700 mt-6 py-2 px-6 rounded-full w-2/4"
          >
            <ThemedText className={`text-white ${buttonCloseModal}`}>
              Cerrar
            </ThemedText>
          </ThemedButton>
        </View>
      </ThemedModal>
    </>
  );
};
