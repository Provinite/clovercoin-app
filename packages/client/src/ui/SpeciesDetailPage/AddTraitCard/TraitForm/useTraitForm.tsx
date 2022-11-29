import { Dispatch, SetStateAction, useState } from "react";
import { CritterTraitValueType } from "../../../../generated/graphql";
import { TraitFormState } from "./TraitFormState";

export const useTraitForm = (
  defaultValue: TraitFormState = defaultForm
): [TraitFormState, Dispatch<SetStateAction<TraitFormState>>] =>
  useState(defaultValue);

export const defaultForm: TraitFormState = {
  enumValues: [],
  name: "",
  valueType: CritterTraitValueType.String,
  id: "",
};
