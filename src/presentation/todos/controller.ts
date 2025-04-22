import { Request, Response } from "express";

export class TodoController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json([
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
    ]);
  };
}
