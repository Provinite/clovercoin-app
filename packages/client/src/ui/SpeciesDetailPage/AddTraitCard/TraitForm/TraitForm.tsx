import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  TextField,
  MenuItem,
  Typography,
  List,
} from "@mui/material";
import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { FetcherWithComponents } from "react-router-dom";
import {
  CritterTraitValueType,
  DuplicateError,
  InvalidArgumentError,
  isBaseError,
} from "@clovercoin/api-client";
import { TraitFormState } from "./TraitFormState";
import { DraggableEnumValueInput } from "./DraggableEnumValueInput";
import { moveArrayItem } from "../../../util/moveArrayItem";
import { v4 } from "uuid";
import { ActionData, RouteType } from "../../../../routes";
export interface TraitFormProps {
  fetcher: FetcherWithComponents<
    ActionData<RouteType<"root.community.species.traits">>
  >;
  form: TraitFormState;
  setForm: Dispatch<SetStateAction<TraitFormState>>;
  onSuccess: () => void;
  onError: (error: DuplicateError | InvalidArgumentError) => void;
  action: string;
  method: "get" | "put" | "post" | "patch";
  saveButtonText: string;
}

export const TraitForm: FC<TraitFormProps> = ({
  form,
  setForm,
  action,
  method,
  fetcher,
  onSuccess,
  saveButtonText,
  onError,
}) => {
  /** Ref for the current `onSuccess` prop */
  const onSuccessRef = useRef(onSuccess);

  /** Ref for the current `onError` prop */
  const onErrorRef = useRef(onError);

  /**
   * Maintain refs for callbacks
   */
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  /**
   * Invoke onSuccess/onError when a fetch finishes.
   */
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (isBaseError(fetcher.data)) {
        onErrorRef.current(fetcher.data);
      } else {
        onSuccessRef.current();
      }
    }
  }, [fetcher]);

  /**
   * Event handler for name field changes
   */
  const handleNameChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setForm((f) => ({ ...f, name: e.target.value }));
    },
    [setForm]
  );

  /**
   * Map tracking how many times each enum item shows up. Used to
   * prevent duplicates.
   */
  const instanceCount = useMemo(
    () =>
      form.enumValues.reduce<Record<string, number>>((map, { name }) => {
        map[name] = (map[name] || 0) + 1;
        return map;
      }, {}),
    [form.enumValues]
  );

  /**
   * Enum values to be rendered, includes the extra "empty" enum value for
   * the next-to-be-created.
   */
  const enumValuesToRender = useMemo(
    () => [
      ...form.enumValues,
      {
        id: undefined,
        name: "",
        localId: v4(),
      },
    ],
    [form.enumValues]
  );

  return (
    <fetcher.Form action={action} method={method}>
      <input type="hidden" name="id" value={form.id} />
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleNameChange}
        autoFocus
        fullWidth
      />
      <br />
      <FormControl
        fullWidth
        css={(theme) => ({
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        })}
      >
        <TextField
          name="valueType"
          value={form.valueType}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              valueType: e.target.value as CritterTraitValueType,
            }))
          }
          select
          label="Type"
        >
          <MenuItem value={CritterTraitValueType.String}>Text</MenuItem>
          <MenuItem value={CritterTraitValueType.Timestamp}>Date</MenuItem>
          <MenuItem value={CritterTraitValueType.Integer}>Number</MenuItem>
          <MenuItem value={CritterTraitValueType.Enum}>Dropdown</MenuItem>
        </TextField>
      </FormControl>
      <br />
      {form.valueType === CritterTraitValueType.Enum && (
        <>
          <Typography variant="h6">Dropdown Options</Typography>
          <Typography variant="body1" color="text.secondary">
            Options for this trait. Drag to reorder.
          </Typography>
          <List>
            {enumValuesToRender.map((ev, i) => {
              return (
                <DraggableEnumValueInput
                  index={i}
                  key={ev.id || ev.localId}
                  label={`Dropdown option ${i}`}
                  enumValue={ev}
                  error={instanceCount[ev.name] > 1}
                  onChange={(e) => {
                    setForm((f) => ({
                      ...f,
                      enumValues: [
                        ...f.enumValues.slice(0, i),
                        {
                          ...ev,
                          name: e.target.value,
                        },
                        ...f.enumValues.slice(i + 1),
                      ],
                    }));
                  }}
                  onReorder={
                    i === form.enumValues.length
                      ? undefined
                      : (fromIndex, toIndex) => {
                          setForm(({ enumValues, ...f }) => {
                            enumValues = [...enumValues];
                            moveArrayItem(enumValues, fromIndex, toIndex);
                            return {
                              ...f,
                              enumValues,
                            };
                          });
                        }
                  }
                  onDelete={
                    i === form.enumValues.length
                      ? undefined
                      : () =>
                          setForm(({ enumValues, ...f }) => {
                            return {
                              ...f,
                              enumValues: enumValues.filter(
                                (_, index) => i !== index
                              ),
                            };
                          })
                  }
                />
              );
            })}
          </List>
        </>
      )}
      <LoadingButton
        loading={fetcher.state !== "idle"}
        variant="contained"
        type="submit"
        color="primary"
        disabled={Object.values(instanceCount).some((c) => c > 1)}
      >
        {saveButtonText}
      </LoadingButton>
    </fetcher.Form>
  );
};
