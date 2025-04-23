import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    res.status(200).json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    try {
      const todo = await this.todoRepository.findById(todoId);
      res.status(200).json(todo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const newTodo = await this.todoRepository.create(createTodoDto!);

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

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

    res.status(200).json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    await this.todoRepository.deleteById(todoId);

    res.status(204).json({ message: `Todo ${id} deleted` });
  };
}
