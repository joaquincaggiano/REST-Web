import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class TodoDatasourceImpl implements TodoDatasource {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    if (isNaN(id)) throw new CustomError("Invalid todo id", 400);

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404);

    return TodoEntity.fromObject(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(newTodo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    const todo = await this.findById(id);

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: todo.id,
      },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
