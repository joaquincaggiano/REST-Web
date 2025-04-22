import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    title: "Buy milk",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Buy bread",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Buy eggs",
    createdAt: new Date(),
  },
];

export class TodoController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      res.status(400).json({ message: "Invalid todo id" });
      return;
    }

    const todo = todos.find((todo) => todo.id === todoId);

    if (!todo) {
      res.status(404).json({ message: `Todo ${id} not found` });
    }

    res.json(todo);
  };
}
