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

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { title: "Hola mundo 1" };
  const todo2 = { title: "Hola mundo 2" };

  test("should return a list of todos", async () => {
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

  test("should return a todo by id", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title: todo.title,
      completedAt: todo.completedAt,
    });
  });

  test("should return 400 Error api/todos/:id", async () => {
    const todoId = "9999";

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("should create a todo", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      title: todo1.title,
      completedAt: null,
    });
  });

  test("should return an error creating a todo when title is empty", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400);

    expect(body).toEqual({ message: "Title is required" });
  });

  test("should return an error creating a todo when title is empty with spaces", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({ title: "    " })
      .expect(400);

    expect(body).toEqual({ message: "Title cannot be empty" });
  });

  test("should return an updated todo", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const title = "Updated todo";

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ title, completedAt: "2025-05-25" })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title,
      completedAt: "2025-05-25T00:00:00.000Z",
    });
  });

  test("should return 404 if TODO is not found when updating", async () => {
    const todoId = "9999";

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("should return an updated todo with only completedAt", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: "2025-05-25" })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title: todo.title,
      completedAt: "2025-05-25T00:00:00.000Z",
    });
  });

  test("should delete a todo", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const id = todo.id;

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      message: `Todo ${id} deleted`,
    });
  });

  test("should return 404 if TODO is not found when deleting", async () => {
    const todoId = "9999";

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });
});
