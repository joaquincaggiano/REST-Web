import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodoController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    res.status(200).json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      res.status(400).json({ message: "Invalid todo id" });
      return;
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      res.status(404).json({ message: `Todo ${id} not found` });
    }

    res.status(200).json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    const [error, updateTodoDto] = UpdateTodoDto.update({
      ...req.body,
      id: todoId,
    });

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      res.status(404).json({ message: `Todo ${id} not found` });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: updateTodoDto!.values,
    });

    res.status(200).json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      res.status(400).json({ message: "Invalid todo id" });
      return;
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      res.status(404).json({ message: `Todo ${id} not found` });
    }

    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    res.status(204).json({ message: `Todo ${id} deleted` });
  };
}
