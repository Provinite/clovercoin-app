import { Critter } from "@clovercoin/api-client";
import { useReducer, Reducer, Dispatch, useEffect } from "react";
import { DeepPick } from "../../typing/types";

const defaultCritterFormState: CritterFormState = {
  name: "",
  traitValues: {},
  variantId: null,
};

export const useCritterForm = (critter?: CritterWithFormValues) => {
  const [state, dispatch] = useReducer<
    Reducer<CritterFormState, CritterFormStateAction>
  >(
    (state, action) => {
      if (action.type === "set") {
        return {
          ...state,
          ...action.partial,
        };
      } else if (action.type === "setTraitValue") {
        return {
          ...state,
          traitValues: {
            ...state.traitValues,
            [action.traitId]: action.value,
          },
        };
      } else {
        throw new Error("Unknown action");
      }
    },

    defaultCritterFormState
  );

  useEffect(() => {
    if (!critter) {
      return;
    }
    dispatch({
      type: "set",
      partial: {
        name: critter.name,
        variantId: critter.traitList.id,
      },
    });
    for (const { traitId, value } of critter.traitValues) {
      dispatch({ type: "setTraitValue", traitId, value: value ?? "" });
    }
  }, [critter]);

  return [state, dispatch] as const;
};

export interface CritterFormState {
  name: string;
  variantId: string | null;
  traitValues: Record<string, string>;
}
export type CritterFormSetTraitAction = {
  type: "setTraitValue";
  traitId: string;
  value: string;
};

export type CritterFormSetAction = {
  type: "set";
  partial: Partial<CritterFormState>;
};

export type CritterFormStateAction =
  | CritterFormSetTraitAction
  | CritterFormSetAction;

export type CritterFormStateReducer = Reducer<
  CritterFormState,
  CritterFormStateAction
>;

export type CritterFormStateDispatch = Dispatch<CritterFormStateAction>;

type CritterWithFormValues = DeepPick<
  Critter,
  "id" | "name" | "traitValues" | "traitList.id"
>;
