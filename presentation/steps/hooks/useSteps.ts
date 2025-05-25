import { useState, useEffect } from "react";

import { useAnimation, useVisibility } from "@/presentation/shared/hooks";
import { Calc, Timer } from "@/config/helpers";

export const useSteps = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [steps, setSteps] = useState(Calc.getRandomNumber(0, 10000));
  const {
    isVisible: isVisibleBanner,
    show: showBanner,
    hide: hideBanner,
  } = useVisibility();
  const { 
    isAlternateIcon, 
    startWalkingAnimation, 
    getBounceTranslate,
  } = useAnimation();


  useEffect(() => {
    const { clearInterval, stopAnimation } = startWalkingAnimation({ isActive: isSyncing});

    return () => {
      clearInterval();
      stopAnimation();
    };
  }, [isSyncing, startWalkingAnimation]);

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
    isAlternateIcon,
    bounceTranslate: getBounceTranslate,
  };
};
