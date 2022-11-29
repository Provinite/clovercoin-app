import { asClass, AwilixContainer } from "awilix";
import { register } from "../awilix/register";
import { uncapitalize } from "../util/stringUtils";
import { ControllerClass, ControllerName, ControllersMap } from "./Controllers";

export type ControllerContext = {
  [controllerName in Uncapitalize<ControllerName>]: InstanceType<
    ControllersMap[Capitalize<controllerName>]
  >;
};

export type ControllerKey<C extends ControllerName = ControllerName> =
  `${Uncapitalize<C>}`;

export function registerControllers<T extends ControllerContext>(
  container: AwilixContainer<T>
): void {
  for (const [name, controllerClass] of Object.entries(ControllersMap)) {
    const controllerKey = uncapitalize(name as ControllerName);
    const resolver = asClass(
      controllerClass as new (...args: any[]) => InstanceType<ControllerClass>
    ).scoped();
    register(container, controllerKey, resolver as any);
  }
}
