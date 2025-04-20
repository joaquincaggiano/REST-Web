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

    this.app.get("/", (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.use((req, res) => {
      res.sendFile(path.join(process.cwd(), this.publicPath, "index.html"));
    });

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}