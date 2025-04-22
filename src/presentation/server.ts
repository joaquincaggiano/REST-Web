import express from "express";
import path from "path";

interface ServerOptions {
  port: number;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: ServerOptions) {
    this.port = options.port;
    this.publicPath = options.publicPath || "public";
  }

  async start() {
    this.app.use(express.static(this.publicPath));

    this.app.get("/api/todos", (req, res) => {
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

    this.app.use((req, res) => {
      res.sendFile(path.join(process.cwd(), this.publicPath, "index.html"));
    });

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
