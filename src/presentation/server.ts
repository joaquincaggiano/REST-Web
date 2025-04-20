import express from "express";
import path from "path";

export class Server {
  private app = express();

  async start() {
    this.app.use(express.static("public"));

    this.app.get("/", (req, res) => {
      const indexPath = path.join(__dirname, "../../public/index.html");
      res.sendFile(indexPath);
    });

    this.app.use((req, res) => {
      res.sendFile(path.join(process.cwd(), "public", "index.html"));
    });

    this.app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }
}