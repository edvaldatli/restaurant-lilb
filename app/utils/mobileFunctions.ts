import { useState, useEffect } from "react";

export const useMediaQuery = (width: number) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);
    const handleMediaChange = (e: MediaQueryListEvent) => setIsMatch(e.matches);

    setIsMatch(mediaQuery.matches);

    mediaQuery.addListener(handleMediaChange);

    return () => mediaQuery.removeListener(handleMediaChange);
  }, [width]);

  return isMatch;
};
