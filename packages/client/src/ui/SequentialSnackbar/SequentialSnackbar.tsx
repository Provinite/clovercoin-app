import { Snackbar, SnackbarCloseReason, SnackbarProps } from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useInterval } from "../../utils/useInterval";
import { AppAlert } from "./AppAlert";
import { SnackbarQueue } from "./SnackbarQueue";

/**
 * Snackbar props that we allow to be customized when used
 * with the {@link SequentialSnackbar}
 */
export interface CustomizableSnackbarProps
  extends Omit<SnackbarProps, "open" | "onClose" | "TransitionProps"> {}

export interface SequentialSnackbarProps {
  queue: SnackbarQueue;
}

/**
 * Mui snackbar component that behaves according to the material-ui spec
 * regarding sequential showing of snackbars. Each snackbar
 * in the queue will be dismissed once there is a new snackbar (or
 * after timeout), and once it is fully dismissed, the next snackbar
 * in the queue will be processed.
 * @param props
 * @param props.queue Queue provided by {@link useSnackbarQueue}
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const queue = useSnackbarQueue();
 *
 *   return (
 *     <div>
 *       <SequentialSnackbar queue={queue} />
 *       <Button onClick={() => queue.append({title: "This is a snackbar})}>Show Snackbar</Button>
 *     </div>
 *   );
 * }
 * ```
 */
export const SequentialSnackbar: FC<SequentialSnackbarProps> = ({ queue }) => {
  /**
   * Currently displayed snackbar props
   */
  const [curSnackbarProps, setProps] = useState<CustomizableSnackbarProps>();
  useEffect(() => {
    // If we have a snackbar to show, and we aren't showing one
    if (queue.queue.length && !curSnackbarProps) {
      setProps({ ...queue.queue[0] });
      queue.shift();
      queue.open();
    }
    // If we have a snackbar to show, and we _are_ currently showing one
    else if (queue.queue.length && curSnackbarProps && queue.isOpen) {
      queue.close();
    }
  }, [queue, curSnackbarProps, queue.isOpen]);

  /**
   * Stores the last timestamp (ms) that the snackbar was opened at.
   */
  const lastOpenedAtRef = useRef<number>(-1);
  useEffect(() => {
    if (queue.isOpen) {
      lastOpenedAtRef.current = Date.now();
    }
  }, [queue.isOpen]);

  /**
   * Automatically close snackbars after 6 seconds.
   */
  useInterval(() => {
    if (!queue.isOpen) {
      return;
    }
    const msOpened = Date.now() - lastOpenedAtRef.current;
    if (msOpened >= Infinity) {
      queue.shift();
      queue.close();
    }
  }, 1000);

  return (
    <Snackbar
      {...curSnackbarProps}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={queue.isOpen}
      onClose={queue.close}
      TransitionProps={{
        onExited: () => {
          setProps(undefined);
        },
      }}
    />
  );
};

/**
 * Create a queue for use with the {@link SequentialSnackbar} component
 * @returns A snackbar queue with various utility functions. All of
 *  the functions are gauranteed to have a stable identitiy. The identity
 *  of the entire queue object will change when any of its data values
 *  change.
 */
export function useSnackbarQueue(): SnackbarQueue {
  const [queue, setQueue] = useState<SnackbarQueue["queue"]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * These functions should have a stable identity, as it's anticipated
   * some of them may be used in the queue itself as props, and the
   * identities of these functions would therefore not update as expected,
   * since props are captured at queueing time.
   */
  const open = useMemo<SnackbarQueue["open"]>(() => () => setIsOpen(true), []);
  const close = useMemo<SnackbarQueue["close"]>(
    () => (_event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      setIsOpen(false);
    },
    []
  );
  const append = useMemo<SnackbarQueue["append"]>(
    () => (item) => setQueue((q) => [...q, item]),
    []
  );
  const shift = useMemo<SnackbarQueue["shift"]>(
    () => () => setQueue(([_, ...q]) => q),
    []
  );
  const appendSimpleError = useMemo<SnackbarQueue["appendSimpleError"]>(
    () => (msg) =>
      append({
        children: (
          <AppAlert severity="error" snackbarQueue={{ close }} text={msg} />
        ),
      }),
    [append, close]
  );
  const appendSimpleSuccess = useMemo<SnackbarQueue["appendSimpleSuccess"]>(
    () => (msg) =>
      append({
        children: (
          <AppAlert severity="success" snackbarQueue={{ close }} text={msg} />
        ),
      }),
    [append, close]
  );
  return useMemo(
    () => ({
      queue,
      append,
      shift,
      isOpen,
      open,
      close,
      appendSimpleError,
      appendSimpleSuccess,
    }),
    [queue, append, shift, isOpen, open, close, appendSimpleError]
  );
}
