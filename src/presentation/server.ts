import express, { Router } from "express";
import path from "path";

interface ServerOptions {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    this.port = options.port;
    this.publicPath = options.publicPath || "public";
    this.routes = options.routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Public folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.routes);

    // SPA
    this.app.use((req, res) => {
      res.sendFile(path.join(process.cwd(), this.publicPath, "index.html"));
    });

    // Start server
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
