import { createCloverCoinAppServer } from "./server";
import { logger } from "./util/logger";
(async () => {
  logger.info({
    message: "Initializing application server",
  });
  const { koa, rootContainer } = await createCloverCoinAppServer();
  koa.listen(3000);

  rootContainer.build(({ logger }) =>
    logger.info({
      message: "Server Started",
      port: 3000,
    })
  );
})();
