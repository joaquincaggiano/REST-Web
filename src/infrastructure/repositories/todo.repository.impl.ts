import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly todoDatasource: TodoDatasource) {}
  getAll(): Promise<TodoEntity[]> {
    return this.todoDatasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.todoDatasource.findById(id);
  }
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.create(createTodoDto);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDatasource.deleteById(id);
  }
}
