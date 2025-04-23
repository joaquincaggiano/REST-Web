export class TodoEntity {
  constructor(
    public id: number,
    public title: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: {[key: string]: any}): TodoEntity {
    const { id, title, completedAt } = object;

    if (!id) throw new Error("Id is required");
    if (!title) throw new Error("Title is required");

    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error("Invalid completedAt");
      }
    }

    return new TodoEntity(id, title, newCompletedAt);
  }
}
