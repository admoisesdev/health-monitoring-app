import { useState, useEffect, useRef } from "react";

import { useAnimation, useVisibility } from "@/presentation/shared/hooks";
import { Calc, Timer } from "@/config/helpers";

export const useSteps = () => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(Calc.getRandomNumber(0, 10000));
  const bannerTimerRef = useRef<number | null>(null);

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
      clearBannerTimer();
    };
  }, [isSyncing, startWalkingAnimation]);

  const clearBannerTimer = () => {
    if (bannerTimerRef.current) {
      clearTimeout(bannerTimerRef.current);
      bannerTimerRef.current = null;
    }
  };

  const handleHideBanner = () => {
    clearBannerTimer();
    hideBanner();
  };

  const handleSync = async () => {
    setIsSyncing(true);

    clearBannerTimer();

    await Timer.sleep();
    setSteps(Calc.getRandomNumber(0, 10000));

    setIsSyncing(false);

    showBanner();

    bannerTimerRef.current = setTimeout(() => {
      hideBanner();
      bannerTimerRef.current = null;
    }, 5000);
  };

  return {
    isSyncing,
    steps,
    handleSync,
    isVisibleBanner,
    hideBanner: handleHideBanner,
    isAlternateIcon,
    bounceTranslate: getBounceTranslate,
  };
};
