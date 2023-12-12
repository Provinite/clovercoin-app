/**
 * @file This file is the entry point for seeding logic. Seeds are intended to
 * be run _after_ migrations, and are performed through the API. Each seed can return
 * values from its `up` function, which will be available via the `getResult` function.
 */
import "reflect-metadata";
import { logger } from "../../util/logger.js";
import { seedClient } from "./_seedClient.js";
import { GetResultFn, seeds } from "./_seeds.mjs";
logger.info({ message: "Running seeds", count: seeds.length });
const results: Record<string, any> = {};
const getResult: GetResultFn = (seedClass) => {
  return results[seedClass.name];
};

for (let i = 0; i < seeds.length; i++) {
  const SeedClass = seeds[i];
  const seeder = new SeedClass();

  logger.info({
    message: "Seed started",
    seed: SeedClass.name,
    index: i,
    of: seeds.length,
  });

  const result = await seeder.up(seedClient, getResult);

  results[SeedClass.name] = result;

  logger.info({
    message: "Seed completed",
    seed: SeedClass.name,
    index: i,
    of: seeds.length,
    result,
  });
}

logger.info({
  message: "All seeds completed",
  results,
});
