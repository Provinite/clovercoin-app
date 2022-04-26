import { Field, ID } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  JoinColumn,
  JoinColumnOptions,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  RelationId,
  RelationOptions,
} from "typeorm";

export type ManyToOneFieldOptions = {
  type: () => ObjectType<any>;
  fieldType?: () => ObjectType<any> | [ObjectType<any>];
  relationOptions?: Omit<RelationOptions, "nullable">;
  nullable: boolean;
  description?: string;
  columnName?: string;
  foreignColumnName?: string;
  joinColumnOptions?: JoinColumnOptions | JoinColumnOptions[];
};

export const ManyToOneField: (
  options: ManyToOneFieldOptions
) => PropertyDecorator = ({
  type,
  fieldType = type,
  relationOptions,
  nullable,
  joinColumnOptions,
  description,
  columnName,
  foreignColumnName,
}) => {
  return (...args) => {
    ManyToOne(type, { ...relationOptions, nullable })(...args);
    JoinColumn(
      joinColumnOptions
        ? (joinColumnOptions as JoinColumnOptions)
        : { name: columnName, referencedColumnName: foreignColumnName }
    )(...args);
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
  };

export const IdField: PropertyDecorator = (...args) => {
  PrimaryGeneratedColumn("uuid")(...args);
  Field(() => ID)(...args);
};
