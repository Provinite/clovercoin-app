import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { CritterTraitValueTypes } from "../CritterTrait/CritterTraitValueTypes";

@ValidatorConstraint({
  async: false,
})
export class TraitEnumOptionsLength implements ValidatorConstraintInterface {
  validate(enumOptions: any[], args: ValidationArguments) {
    const obj = args.object as any;
    if (obj.valueType === CritterTraitValueTypes.Enum) {
      return enumOptions.length > 0;
    }
    return enumOptions.length === 0;
  }

  defaultMessage(args: ValidationArguments) {
    const obj = args.object as any;
    if (obj.valueType === CritterTraitValueTypes.Enum) {
      return "You must provide at least one option for dropdown traits";
    } else {
      return 'Traits must be of type "dropdown" to use dropdown options';
    }
  }
}
