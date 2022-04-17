/**
 * CSS constants that are helpful for providing consistent animations.
 */
export enum TransitionDuration {
  /** Duration for complex/large transition */
  fullscreen = "500ms",
  /** Duration duration for smaller/simpler transitions */
  small = "225ms",
  /** Duration for teeny tiny transitions */
  tiny = "100ms",
}

export enum TransitionTimingFunction {
  /**
   * Animation eases in, overshoots 100% and quickly bounces back.
   */
  EaseInBounceOut = "cubic-bezier(.45,.16,.53,1.11)",
  /**
   * Rapid animation that tapers out just before ending.
   */
  QuickInEaseOut = "cubic-bezier(.3,.85,.41,.99)",
}
