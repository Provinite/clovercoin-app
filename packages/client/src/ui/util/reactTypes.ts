import { ComponentType } from "react";

/**
 * Extract the props type form a component
 */
export type PropsType<Component extends ComponentType<any>> =
  Component extends ComponentType<infer U> ? U : never;
