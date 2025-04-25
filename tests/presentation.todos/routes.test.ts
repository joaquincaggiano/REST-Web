import request from "supertest";
import { testServer } from "../test-server";

describe("Todos Routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  test("should return a list of todos", async () => {
    const response = await request(testServer.app)
      .get("/api/todos")
      .expect(200);
  });
});
