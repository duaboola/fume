const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 7005;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.static(__dirname + "/public/uploads"));

  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(7005, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:7005`);
  });
});