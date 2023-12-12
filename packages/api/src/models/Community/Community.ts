import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm";
import { IdField } from "../relationFieldDecorators.js";
import { Role } from "../Role/Role.js";

@Entity()
@ObjectType()
export class Community {
  @IdField
  id!: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  name!: string;

  @OneToMany(() => Role, (role) => role.community)
  @Field(() => [Role])
  @TypeormLoader()
  roles!: Role[];
}
