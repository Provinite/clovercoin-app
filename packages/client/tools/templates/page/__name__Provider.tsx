import * as React from "react";
import { FC } from "react";
import { __name__Page, __name__PageProps } from "./__name__Page";

export interface __name__ProviderProps extends __name__PageProps {}

export const __name__Provider: FC<__name__ProviderProps> = (args) => {
  return <__name__Page {...args} />;
};
