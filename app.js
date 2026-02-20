const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;

// Permet de servir les fichiers statiques (images, CSS) si besoin
app.use(express.static(path.join(__dirname, "public")));

// Route principale : Envoie ton interface mobile 7fbet
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Logique Temps Réel avec Socket.io
io.on("connection", (socket) => {
  console.log("Un joueur est connecté : " + socket.id);

  // Exemple : Reception d'un pari depuis le mobile
  socket.on("action_pari", (data) => {
    console.log(`Pari reçu pour le mode ${data.type} par ${data.user}`);
    
    // On renvoie une confirmation en temps réel à l'utilisateur
    socket.emit("status_pari", {
      success: true,
      message: "Pari enregistré instantanément !"
    });
  });

  socket.on("disconnect", () => {
    console.log("Joueur déconnecté");
  });
});

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur 7fbet en ligne sur le port ${PORT}`);
});
