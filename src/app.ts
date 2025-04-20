import { envs } from "./config/envs";
import { Server } from "./presentation/server";

const main = async () => {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });
  await server.start();
};

main();
