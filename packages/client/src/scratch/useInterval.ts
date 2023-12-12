import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, interval: number | null) => {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (interval === null) return;
    const id = setInterval(() => cbRef.current(), interval);

    return () => clearInterval(id);
  }, [interval]);
};
