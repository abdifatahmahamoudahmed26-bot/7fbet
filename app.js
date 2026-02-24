const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;

/* 🔥 FICHIERS STATIQUES À LA RACINE */
app.use(express.static(__dirname));

/* 🔥 ROUTE PRINCIPALE */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* 🔥 SOCKET.IO */
io.on("connection", (socket) => {
  console.log("🟢 connecté :", socket.id);
});

/* 🔥 LANCEMENT */
server.listen(PORT, () => {
  console.log("🚀 serveur lancé");
});
