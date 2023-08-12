import { Alert, AlertProps, Button, IconButton, Link } from "@mui/material";
import { forwardRef } from "react";
import { Link as RouteLink } from "react-router-dom";
import { SnackbarQueue } from "../../SequentialSnackbar/SnackbarQueue";
import CloseIcon from "@mui/icons-material/Close";
import { stylesheet } from "../../../utils/emotion";

export interface TraitActionAlertProps extends AlertProps {
  onClose: SnackbarQueue["close"];
  linkTo: string;
}

const ss = stylesheet({
  root: {
    width: "100%",
  },
  button: (theme) => ({ marginRight: theme.spacing(1) }),
  link: {
    textDecoration: "none",
  },
});

export const TraitActionAlert = forwardRef<any, TraitActionAlertProps>(
  ({ onClose, linkTo, ...props }, ref) => (
    <Alert
      ref={ref}
      variant="filled"
      severity="success"
      onClose={onClose}
      css={ss.root}
      action={
        <>
          <Link component={RouteLink} to={linkTo} css={ss.link}>
            <Button variant="text" size="small" css={ss.button}>
              Return to List
            </Button>
          </Link>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      {...props}
    >
      Trait Saved
    </Alert>
  )
);
