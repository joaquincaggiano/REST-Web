import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import { GetTodos } from "../../domain/use-cases/todo/get-todos";
import { GetTodo } from "../../domain/use-cases/todo/get-todo";
import { CreateTodo } from "../../domain/use-cases/todo/create-todo";
import { UpdateTodo } from "../../domain/use-cases/todo/update-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";
import { CustomError } from "../../domain/errors/custom.error";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch((error) => {
        this.handleError(res, error);
      });
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    new GetTodo(this.todoRepository)
      .execute(todoId)
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((error) => {
        this.handleError(res, error);
      });
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => {
        res.status(201).json(todo);
      })
      .catch((error) => {
        this.handleError(res, error);
      });
  };

  public updateTodo = (req: Request, res: Response) => {
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

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((error) => {
        this.handleError(res, error);
      });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);

    new DeleteTodo(this.todoRepository)
      .execute(todoId)
      .then(() => {
        res.status(200).json({ message: `Todo ${id} deleted` });
      })
      .catch((error) => {
        this.handleError(res, error);
      });
  };
}
