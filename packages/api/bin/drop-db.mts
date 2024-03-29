import { dataSource, configureDataSource } from "../src/db/dbConnection.js";
import { logger } from "../src/util/logger.js";
configureDataSource({ entities: [], migrations: [] });
logger.info({ message: "Connecting to database" });
await dataSource.initialize();
const queryRunner = await dataSource.createQueryRunner();
logger.info({ message: "Dropping public schema" });
await queryRunner.dropSchema("public", true, true);
logger.info({ message: "Creating public schema" });
await queryRunner.createSchema("public", false);
logger.info({ message: "Database refreshed" });
await dataSource.destroy();
