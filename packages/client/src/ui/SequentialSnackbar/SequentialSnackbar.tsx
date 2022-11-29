import { Snackbar, SnackbarCloseReason, SnackbarProps } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useMemo, useState } from "react";

/**
 * Snackbar props that we allow to be customized when used
 * with the {@link SequentialSnackbar}
 */
interface CustomizableSnackbarProps
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
  const [props, setProps] = useState<CustomizableSnackbarProps>();
  useEffect(() => {
    if (queue.queue.length && !props) {
      setProps({ ...queue.queue[0] });
      queue.shift();
      queue.open();
    } else if (queue.queue.length && props && queue.isOpen) {
      queue.close();
    }
  }, [queue, props, open]);

  return (
    <Snackbar
      {...props}
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
}

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
  return useMemo(
    () => ({
      queue,
      append,
      shift,
      isOpen,
      open,
      close,
    }),
    [queue, isOpen]
  );
}
