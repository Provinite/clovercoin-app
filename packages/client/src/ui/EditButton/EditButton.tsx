import { Button } from "@mui/material";
import { FC } from "react";
import { Link } from "../Link/Link";
import TuneIcon from "@mui/icons-material/Tune";
import { stylesheet } from "../../utils/emotion";
export interface EditButtonProps {
  to: string;
}
export const EditButton: FC<EditButtonProps> = ({ to }) => {
  return (
    <Link to={to} css={ss.root}>
      <Button startIcon={<TuneIcon />} css={ss.button}>
        Edit
      </Button>
    </Link>
  );
};

const ss = stylesheet({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  button: (theme) => ({
    pading: theme.spacing(1),
    justifyContent: "flex-start",
    flexGrow: 1,
  }),
});
EditButton.displayName = "EditButton";
