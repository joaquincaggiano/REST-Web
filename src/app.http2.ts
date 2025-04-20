import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(fs.readFileSync("./public/index.html", "utf-8"));
      res.end();
      return;
    }

    if (req.url?.endsWith(".js")) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
    } else if (req.url?.endsWith(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    }

    try {
      const responseContent = fs.readFileSync(`./public/${req.url}`, "utf-8");
      res.end(responseContent);

    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end();
    }
  }
);

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
