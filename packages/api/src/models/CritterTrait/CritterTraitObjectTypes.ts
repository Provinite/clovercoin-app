import { Field, ID, ObjectType } from "type-graphql";
import { CritterTrait } from "./CritterTrait";

@ObjectType({ implements: CritterTrait })
export class CritterStringTrait extends CritterTrait {
  constructor() {
    super();
    throw new Error(
      "This class is in-effect abstract, and serves strictly as an object type definition. Do not construct directly."
    );
  }
  @Field(() => String, { nullable: true })
  valueString: string | null = null;
}

@ObjectType({ implements: CritterTrait })
export class CritterIntTrait extends CritterTrait {
  constructor() {
    super();
    throw new Error(
      "This class is in-effect abstract, and serves strictly as an object type definition. Do not construct directly."
    );
  }
  @Field(() => Number, { nullable: true })
  valueInt: number | null = null;
}
@ObjectType({ implements: CritterTrait })
export class CritterTimestampTrait extends CritterTrait {
  constructor() {
    super();
    throw new Error(
      "This class is in-effect abstract, and serves strictly as an object type definition. Do not construct directly."
    );
  }
  @Field(() => Date, { nullable: true })
  valueTimestamp: Date | null = null;
}

@ObjectType({ implements: CritterTrait })
export class CritterEnumTrait extends CritterTrait {
  constructor() {
    super();
    throw new Error(
      "This class is in-effect abstract, and serves strictly as an object type definition. Do not construct directly."
    );
  }
  @Field(() => ID, { nullable: true })
  valueEnumValueId!: string;
}
