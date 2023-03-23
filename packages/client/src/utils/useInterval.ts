import { useEffect, useRef } from "react";

export const useInterval = (fn: () => void, interval: number) => {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    const iv = setInterval(() => fnRef.current(), interval);
    return () => clearInterval(iv);
  }, [interval]);
};
