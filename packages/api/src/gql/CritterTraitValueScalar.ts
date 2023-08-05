// import { GraphQLScalarType } from "graphql";

// export const CritterTraitValueScalar = new GraphQLScalarType({
//   name: "CritterTraitValueScalar",
//   description: "A critter trait value",
//   serialize(value: unknown): string {
//     return JSON.stringify(value);
//   },
//   parseValue(value: unknown): string | number | boolean {
//     if (typeof value !== "string") {
//       throw new Error("CritterTraitValueScalar can only parse string values");
//     }
//     return JSON.parse(value);
//   },
//   parseLiteral(ast): ObjectId {
//     // check the type of received value
//     if (ast.kind !== Kind.STRING) {
//       throw new Error("ObjectIdScalar can only parse string values");
//     }
//     return new ObjectId(ast.value); // value from the client query
//   },
// });
