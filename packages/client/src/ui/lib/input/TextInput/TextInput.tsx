import * as React from "react";
import { FunctionComponent, InputHTMLAttributes } from "react";

export const TextInput: FunctionComponent<
  InputHTMLAttributes<HTMLInputElement>
> = (props) => <input {...props} type="text" />;
