import { Field, ID } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  RelationId,
  RelationOptions,
} from "typeorm";

export interface ManyToOneFieldOptions {
  type: () => ObjectType<any>;
  fieldType?: () => ObjectType<any> | [ObjectType<any>];
  columnName: string;
  foreignColumnName: string;
  relationOptions?: Omit<RelationOptions, "nullable">;
  nullable: boolean;
  description?: string;
}

export const ManyToOneField: (
  options: ManyToOneFieldOptions
) => PropertyDecorator =
  ({
    type,
    columnName,
    description,
    fieldType = type,
    foreignColumnName,
    nullable,
    relationOptions = {},
  }) =>
  (...args) => {
    ManyToOne(type, { ...relationOptions, nullable })(...args);
    JoinColumn({
      name: columnName,
      referencedColumnName: foreignColumnName,
    });
    Field(fieldType, { description })(...args);
    TypeormLoader()(...args);
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
  };

export const IdField: PropertyDecorator = (...args) => {
  PrimaryGeneratedColumn("uuid")(...args);
  Field(() => ID)(...args);
};
