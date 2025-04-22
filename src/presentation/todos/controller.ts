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
    res.status(200).json(todos);
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

    res.status(200).json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      createdAt: new Date(),
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      res.status(400).json({ message: "Invalid todo id" });
      return;
    }

    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      res.status(404).json({ message: `Todo ${id} not found` });
      return;
    }

    todos[todoIndex].title = title;

    res.status(200).json(todos[todoIndex]);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      res.status(400).json({ message: "Invalid todo id" });
      return;
    }

    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      res.status(404).json({ message: `Todo ${id} not found` });
      return;
    }

    todos.splice(todoIndex, 1);

    res.status(204).json({ message: `Todo ${id} deleted` });
  };
}
