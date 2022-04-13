import { useCallback, useState } from "react";

export function useHover(
  initialState = false
): [
  isHovering: boolean,
  props: { onMouseOver: () => void; onMouseOut: () => void }
] {
  const [isHovering, setIsHovering] = useState(initialState);
  return [
    isHovering,
    {
      onMouseOver: useCallback(() => setIsHovering(true), []),
      onMouseOut: useCallback(() => setIsHovering(false), []),
    },
  ];
}
