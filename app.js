const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs"); // Pour gérer les fichiers (Base de données)

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;
const DB_FILE = path.join(__dirname, "users.json");

// Middleware pour lire les données envoyées par le formulaire
app.use(express.json());
app.use(express.static(__dirname));

/* 💾 LOGIQUE DE LA BASE DE DONNÉES */

// Initialiser le fichier s'il n'existe pas
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Route pour enregistrer un utilisateur
app.post("/register", (req, res) => {
  const newUser = req.body;
  
  // Lire la base actuelle
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  
  // Ajouter le nouvel utilisateur
  data.push(newUser);
  
  // Sauvegarder
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  
  console.log("👤 Nouvel utilisateur enregistré :", newUser.userid);
  res.json({ success: true, message: "Utilisateur sauvegardé !" });
});

/* 🚀 ROUTES & SOCKET */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("🟢 connecté :", socket.id);
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur Ludobet sur le port ${PORT}`);
});
