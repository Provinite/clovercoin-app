import { Typography } from "@mui/material";
import { FC, HTMLProps } from "react";

export const TextStack: FC<
  {
    primary: string;
    secondary?: string;
    className?: string;
  } & HTMLProps<HTMLDivElement>
> = ({ primary, secondary, ...rest }) => {
  return (
    <div {...rest}>
      <Typography variant="body1">{primary}</Typography>
      <Typography
        variant="body2"
        css={(theme) => ({ color: theme.palette.text.secondary })}
      >
        {secondary ?? "\u00A0"}
      </Typography>
    </div>
  );
};
