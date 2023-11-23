import { useEffect, useState } from "react";

/**
 * Helpful for initiating transition animation when component enters DOM
 * @return boolean - returns false on the first render and true immediately after
 */
export const useNextFrame = () => {
  const [transitioned, setTransitioned] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setTransitioned(true));
  }, []);
  return transitioned;
};
