import request from "supertest";
import { testServer } from "../test-server";
import { prisma } from "../../src/data/postgres";

describe("Todos Routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  const todo1 = { title: "Hola mundo 1" };
  const todo2 = { title: "Hola mundo 2" };

  test("should return a list of todos", async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].title).toBe(todo1.title);
    expect(body[1].title).toBe(todo2.title);
  });
});
