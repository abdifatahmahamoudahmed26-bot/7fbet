const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Bienvenue sur 7fbet !");
});

io.on("connection", socket => {
  console.log("Nouvel utilisateur connecté");
  socket.on("message", msg => {
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`7fbet écoute sur port ${PORT}`));
