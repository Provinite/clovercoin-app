/**
 * @file Simple component for conditional rendering of children
 */
import { FunctionComponent, ReactNode } from "react";
export interface IfProps {
  condition: boolean;
  children: ReactNode;
}
/**
 * Component that renders its children when the provided
 * condition is true.
 * @param props
 * @param props.condition If true, children are rendered
 * @example
 * ```tsx
 * const MyComponent = () => (
 *   <If condition={todaysDate === "1/1"}>Happy New Year</If>
 * );
 * ```
 */
export const If: FunctionComponent<IfProps> = ({ condition, children }) =>
  condition ? <>{children}</> : <></>;
