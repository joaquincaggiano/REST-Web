import { envs } from "../src/config/envs";
import { Server } from "../src/presentation/server";

jest.mock("../src/presentation/server"); // Mock the server class

describe("App", () => {
  test("Should call server with correct params", async () => {
    await import("../src/app");

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      publicPath: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });

    expect(Server.prototype.start).toHaveBeenCalled();
  });
});
