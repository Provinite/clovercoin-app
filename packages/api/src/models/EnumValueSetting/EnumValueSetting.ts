import { ObjectType } from "type-graphql";
import { Entity } from "typeorm";
import { IdField } from "../relationFieldDecorators";

@Entity()
@ObjectType()
export class EnumValueSetting {
  @IdField
  id!: string;
}
