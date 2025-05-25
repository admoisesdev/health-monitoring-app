import { useState } from "react";

import { Calc, Timer } from "@/config/helpers";
import { useVisibility } from "@/presentation/shared/hooks";


export const useSteps = () => {
  const {
    isVisible: isVisibleBanner,
    show: showBanner,
    hide: hideBanner,
  } = useVisibility();
  const [isSyncing, setIsSyncing] = useState(false);
  const [steps, setSteps] = useState(Calc.getRandomNumber(0, 10000));

  const handleSync = async () => {
    setIsSyncing(true);

    setSteps(Calc.getRandomNumber(0, 10000));
    await Timer.sleep();

    setIsSyncing(false);

    showBanner();

    setTimeout(() => {
      hideBanner();
    }, 5000);
  };

  return {
    isSyncing,
    steps,
    handleSync,
    isVisibleBanner,
    hideBanner,
  };
};
