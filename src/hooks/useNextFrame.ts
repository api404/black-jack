import { useEffect, useState } from "react";

export const useNextFrame = () => {
  const [transitioned, setTransitioned] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setTransitioned(true));
  }, []);
  return transitioned;
};
