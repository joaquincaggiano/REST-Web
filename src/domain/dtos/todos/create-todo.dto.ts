export class CreateTodoDto {
  private constructor(public readonly title: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { title } = props;

    if (!title) return ["Title is required", undefined];
    if (title.trim().length === 0) return ["Title cannot be empty", undefined];

    return [undefined, new CreateTodoDto(title)];
  }
}
