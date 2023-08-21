import { Field, ID } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Column,
  JoinColumn,
  JoinColumnOptions,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  RelationId,
  RelationOptions,
} from "typeorm";

export type ManyToOneFieldOptions<
  U = any,
  T extends ObjectType<U> = ObjectType<U>
> = {
  type: () => T;
  fieldType?: () => T | [T];
  relationOptions?: Omit<RelationOptions, "nullable">;
  nullable: boolean;
  description?: string;
  columnName: string;
  foreignColumnName?: string;
  joinColumnOptions?: JoinColumnOptions | JoinColumnOptions[];
  inverseSide?: (obj: U) => any;
};

export const ManyToOneField: <U, T extends ObjectType<U> = ObjectType<U>>(
  options: ManyToOneFieldOptions<U, T>
) => PropertyDecorator = ({
  type,
  fieldType = type,
  inverseSide,
  relationOptions,
  nullable,
  joinColumnOptions = {},
  description,
  columnName,
  foreignColumnName,
}) => {
  return (...args) => {
    if (inverseSide) {
      ManyToOne(type, inverseSide, { ...relationOptions, nullable })(...args);
    } else {
      ManyToOne(type, { ...relationOptions, nullable })(...args);
    }
    JoinColumn({
      name: columnName,
      referencedColumnName: foreignColumnName,
      ...joinColumnOptions,
    })(...args);
    Field(fieldType, { description })(...args);
    TypeormLoader()(...args);
  };
};

export interface RelationIdFieldOptions<T> {
  relation: (model: T) => any;
  nullable: boolean;
  description?: string;
}

export const RelationIdField: <T>(
  options: RelationIdFieldOptions<T>
) => PropertyDecorator =
  <T>({ description, nullable, relation }: RelationIdFieldOptions<T>) =>
  (...args) => {
    RelationId(relation)(...args);
    Field(() => ID, { nullable, description })(...args);
    Column()(...args);
  };

export const IdField: PropertyDecorator = (...args) => {
  PrimaryGeneratedColumn("uuid")(...args);
  Field(() => ID)(...args);
};
