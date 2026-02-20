const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Port dynamique pour Render
const PORT = process.env.PORT || 10000;

// Servir les fichiers statiques (images, css, js)
app.use(express.static(path.join(__dirname, "public")));

// Route pour afficher la page d'accueil (accueil.php devient index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Gestion du temps réel avec Socket.io
io.on("connection", (socket) => {
  console.log("🟢 Un utilisateur s'est connecté : " + socket.id);

  // Écouter les clics sur FRIEND ou RADIUM
  socket.on("pari_action", (data) => {
    console.log(`Pari reçu pour le mode: ${data.mode}`);
    
    // Réponse en temps réel au joueur
    socket.emit("pari_confirmation", {
      status: "success",
      message: `Ton pari en mode ${data.mode} a été validé !`
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Utilisateur déconnecté");
  });
});

// Démarrage du serveur sur le bon port
server.listen(PORT, () => {
  console.log(`🚀 Serveur 7fbet actif sur http://localhost:${PORT}`);
});
