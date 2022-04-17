import { useCallback, useState } from "react";

/**
 * Hook for common handling of hover on dom elements
 * @param [initialState=false] Initial hover state
 * @returns A tuple of length 2. The first element is a boolean
 *  indicating the current hover status. THe second element is
 *  an object with props to be applied to an element to associate
 *  its hover state with the first element.
 *
 * @example
 * ```ts
 * const SomeComponent = () => {
 *  const [isHovering, hoverProps] = useHover();
 *  return <div
 *    style={{ backgroundColor: isHovering ? "red" : "white" }}
 *    {...hoverProps}
 *  >
 *    { isHovering ? "Hovering" : "Not Hovering" }
 *  </div>
 * }
 * ```
 */
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
