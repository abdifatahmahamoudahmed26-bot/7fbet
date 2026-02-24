const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;

// fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("🟢 connecté :", socket.id);

  socket.on("pari_action", (data) => {
    socket.emit("pari_confirmation", {
      status: "success",
      message: `Pari ${data.mode} validé`
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 déconnecté");
  });
});

server.listen(PORT, () => {
  console.log("🚀 serveur lancé");
});
