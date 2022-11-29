import { IconButton, ListItem, TextField, Tooltip } from "@mui/material";
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useRef,
  useState,
} from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { stylesheet } from "../../../../utils/emotion";
import { If } from "../../../util/If";
import ErrorIcon from "@mui/icons-material/Error";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
export interface DraggableEnumValueInputProps {
  enumValue: { id?: string; name: string };
  error: boolean;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  label: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  index: number;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  onDelete?: () => void;
}

interface DragItem {
  enumValue: DraggableEnumValueInputProps["enumValue"];
  index: number;
}

export const DraggableEnumValueInput: FC<DraggableEnumValueInputProps> = ({
  enumValue: { id, name },
  index,
  className,
  onChange,
  label,
  error,
  onBlur,
  onReorder,
  onDelete,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: "enumValueInput",
      item: {
        enumValue: { id, name },
        index,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: onReorder && !isFocused,
    }),
    [index, id, name, isFocused, onReorder]
  );

  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop<DragItem>(
    () => ({
      accept: onReorder ? "enumValueInput" : "",
      canDrop: () => Boolean(onReorder),
      hover: (item, monitor) => {
        if (!ref.current || !onReorder) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        onReorder(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    }),
    [index, onReorder]
  );

  drag(drop(ref));

  return (
    <ListItem sx={{ pl: 0, pr: 0 }} ref={ref}>
      <input type="hidden" name="enumValueId" value={id ?? ""} />
      <TextField
        label={label}
        type="string"
        value={name}
        name="enumValues"
        color={error ? "error" : undefined}
        className={className}
        InputProps={{
          endAdornment: (
            <>
              {error ? (
                <ErrorIcon
                  css={[ss.dragHandle]}
                  fontSize="small"
                  color="error"
                />
              ) : (
                <If condition={Boolean(onReorder)}>
                  <DragHandleIcon css={[ss.dragHandle]} />
                </If>
              )}
              <If condition={Boolean(onDelete)}>
                <Tooltip title="Delete">
                  <IconButton onClick={onDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </If>
            </>
          ),
        }}
        fullWidth
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(...args) => {
          console.log("Blur");
          setIsFocused(false);
          onBlur && onBlur(...args);
        }}
        css={[
          error ? ss.errorField : undefined,
          isDragging ? ss.draggingField : undefined,
        ]}
        disabled={isDragging}
      />
    </ListItem>
  );
};

const ss = stylesheet({
  errorField: (theme) => ({
    "& label": {
      color: theme.palette.error.main,
    },
    "& fieldset": {
      borderColor: theme.palette.error.main,
    },
  }),
  draggingField: {
    opacity: 0,
  },
  dragHandle: {
    cursor: "grab",
  },
});
