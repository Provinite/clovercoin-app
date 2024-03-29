import { SnackbarCloseReason } from "@mui/material";
import { SyntheticEvent } from "react";
import { CustomizableSnackbarProps } from "./SequentialSnackbar";

/**
 * Queue for use with the {@link SequentialSnackbar}
 */

export interface SnackbarQueue {
  /**
   * The queue of snackbar props to display.
   */
  queue: CustomizableSnackbarProps[];
  /**
   * Add an item to the end of the queue.
   * @param item The snackbar props to use
   */
  append(item: CustomizableSnackbarProps): void;
  /**
   * Remove the front item from the queue.
   */
  shift(): void;
  /**
   * A boolean indicating whether there is currently a snackbar
   * being displayed.
   */
  isOpen: boolean;
  /**
   * Open the snackbar
   */
  open: () => void;
  /**
   * Close the snackbar
   */
  close: (event?: Event | SyntheticEvent, reason?: SnackbarCloseReason) => void;
  /**
   * Add a simple error to the queue.
   */
  appendSimpleError: (message: string) => void;
  /**
   * Add a simple success message to the queue.
   */
  appendSimpleSuccess: (message: string) => void;
}
