import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/api/todos", (req, res) => {
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
    });

    return router;
  }
}
