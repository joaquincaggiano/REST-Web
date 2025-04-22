export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.title) returnObj.title = this.title;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, title, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id) return ["Id is required", undefined];
    if (isNaN(id)) return ["Id must be a number", undefined];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        return ["CompletedAt is not a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, title, newCompletedAt)];
  }
}
