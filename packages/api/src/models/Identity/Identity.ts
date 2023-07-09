import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm/index.js";
import { IdField } from "../relationFieldDecorators.js";

@ObjectType()
@Entity()
export class Identity {
  @IdField
  id!: string;

  @Column({
    nullable: false,
  })
  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;
}
