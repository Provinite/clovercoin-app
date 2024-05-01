import { IsEmpty, IsString, IsUUID } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, OneToMany } from "typeorm";
import { IdField } from "../relationFieldDecorators.js";
import { Role } from "../Role/Role.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
export class Community {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  @IsString({ groups: [...ValidationGroupAll] })
  name!: string;

  @OneToMany(() => Role, (role) => role.community)
  @Field(() => [Role])
  @TypeormLoader()
  roles!: Role[];
}
