import { View } from "react-native";
import { useThemeColor } from "@/presentation/theme/hooks";

import { ThemedButton, ThemedText } from "@/presentation/theme/components";

import { HealthTipResponse } from "@/infrastructure/interfaces";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useVisibility } from "@/presentation/shared/hooks";
import { ThemedModal } from "@/presentation/theme/components/ThemedModal";

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
  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const IconComponent = IconMap[tip.icon.library as IconLibrary];

  return (
    <>
      <View className="flex-row items-start gap-3 h-[120px] border-b border-slate-200 pb-4">
        <View className="justify-center items-center w-20 h-3/4">
          <IconComponent
            name={tip.icon.name}
            size={60}
            color={secondaryColor}
          />
        </View>

        <View className="flex-1 justify-center h-full my-2">
          <ThemedText variant="h3" className="text-slate-700">
            {tip.title}
          </ThemedText>
          <ThemedText
            variant="normal"
            className="text-slate-500 w-full"
            numberOfLines={2}
          >
            {tip.description}
          </ThemedText>
          <ThemedButton onPress={showModal} className="self-end px-0 py-1">
            <ThemedText className="text-slate-600">Ver más</ThemedText>
          </ThemedButton>
        </View>
      </View>

      <ThemedModal
        isVisible={isVisibleModal}
        hideModal={hideModal}
        isNativeModal
      >
        <View className="items-center">
          <View className="mb-6 items-center">
            <IconComponent
              name={tip.icon.name}
              size={80}
              color={secondaryColor}
            />
          </View>

          <ThemedText variant="h2" className="text-slate-700 text-center mb-4">
            {tip.title}
          </ThemedText>

          <ThemedText
            variant="normal"
            className="text-slate-600 text-center mb-6"
          >
            {tip.description}
          </ThemedText>

          

          <ThemedButton
            onPress={hideModal}
            className="bg-slate-700 mt-6 py-2 px-6 rounded-full"
          >
            <ThemedText className="text-white">Cerrar</ThemedText>
          </ThemedButton>
        </View>
      </ThemedModal>
    </>
  );
};
