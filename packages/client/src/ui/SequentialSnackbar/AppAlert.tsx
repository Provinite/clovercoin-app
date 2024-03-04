import {
  Alert,
  AlertColor,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { Link } from "../Link/Link";
import { SnackbarQueue } from "./SnackbarQueue";
import CloseIcon from "@mui/icons-material/Close";
export interface AppAlertProps {
  snackbarQueue: Pick<SnackbarQueue, "close">;
  text: ReactNode;
  severity: AlertColor;
  actionLink?: {
    text: string;
    to: string;
  };
}
export const AppAlert = forwardRef<HTMLDivElement, AppAlertProps>(
  ({ snackbarQueue: { close }, text, severity, actionLink }, ref) => {
    return (
      <Alert
        ref={ref}
        variant="filled"
        onClose={close}
        severity={severity}
        css={{ width: "100%", alignItems: "center" }}
        action={
          <>
            {actionLink && (
              <Link to={actionLink.to}>
                <Button variant="text" size="large">
                  {actionLink.text}
                </Button>
              </Link>
            )}
            <IconButton size="medium" onClick={close}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </>
        }
      >
        <Typography fontSize={18}>{text}</Typography>
      </Alert>
    );
  }
);
