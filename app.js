const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;

/* =========================
   CONFIG EXPRESS
========================= */

// Lire le JSON (pour futures API)
app.use(express.json());

// Servir tous les fichiers depuis la racine
app.use(express.static(__dirname));

/* =========================
   ROUTES
========================= */

// Page principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* =========================
   VARIABLES TEMPS RÉEL
========================= */

let onlineUsers = 0;
let paris = []; // historique des paris

/* =========================
   SOCKET.IO TEMPS RÉEL
========================= */

io.on("connection", (socket) => {

  onlineUsers++;

  console.log("🟢 Nouveau joueur :", socket.id);

  // Envoyer le nombre de joueurs en ligne à tout le monde
  io.emit("update_users", onlineUsers);

  // Envoyer l'historique des paris au nouveau joueur
  socket.emit("historique_paris", paris);


  /* ===== PARI ===== */

  socket.on("pari_action", (data) => {

    const nouveauPari = {
      id: socket.id,
      mode: data.mode,
      montant: data.montant || 0,
      time: new Date().toLocaleTimeString()
    };

    paris.push(nouveauPari);

    // Limite historique
    if (paris.length > 20) {
      paris.shift();
    }

    // Confirmation au joueur
    socket.emit("pari_confirmation", {
      status: "success",
      message: `✅ Pari ${data.mode} accepté`
    });

    // Envoyer à tous les joueurs
    io.emit("new_pari", nouveauPari);
  });


  /* ===== CHAT LIVE (optionnel) ===== */

  socket.on("chat_message", (msg) => {
    io.emit("chat_message", {
      id: socket.id,
      message: msg
    });
  });


  /* ===== DECONNEXION ===== */

  socket.on("disconnect", () => {

    onlineUsers--;

    console.log("🔴 Joueur parti :", socket.id);

    io.emit("update_users", onlineUsers);
  });

});


/* =========================
   LANCEMENT SERVEUR
========================= */

server.listen(PORT, () => {
  console.log("🚀 Serveur en ligne sur le port " + PORT);
});
