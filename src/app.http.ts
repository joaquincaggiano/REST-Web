import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {
  console.log(req.url);
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.write(`<h1>URL: ${req.url}</h1>`);
  //   res.end();

  //   const data = { name: "John Doe", age: 30, city: "New York" };
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.write(JSON.stringify(data));
  //   res.end();

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

  const responseContent = fs.readFileSync(`./public/${req.url}`, "utf-8");
  res.end(responseContent);
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
