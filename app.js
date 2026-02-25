const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;
const DB_FILE = path.join(__dirname, "users.json");

// Configuration pour lire le JSON et servir les fichiers (HTML, CSS, JS)
app.use(express.json());
app.use(express.static(__dirname));

/* 💾 LOGIQUE BASE DE DONNÉES JSON */
const initDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([]));
    }
};
initDB();

/* 📝 ROUTE : INSCRIPTION (Sauvegarde) */
app.post("/register", (req, res) => {
    try {
        const newUser = req.body;
        const data = JSON.parse(fs.readFileSync(DB_FILE));
        data.push(newUser);
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        console.log(`👤 Nouvel utilisateur inscrit : ${newUser.userid}`);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
});

/* 🔑 ROUTE : CONNEXION (Vérification) */
app.post("/login", (req, res) => {
    try {
        const { userid, password } = req.body;
        const data = JSON.parse(fs.readFileSync(DB_FILE));
        
        // On cherche l'utilisateur qui a le bon ID et le bon mot de passe
        const user = data.find(u => u.userid === userid && u.password === password);
        
        if (user) {
            console.log(`✅ Connexion réussie : ${userid}`);
            res.status(200).json({ success: true, user: user });
        } else {
            console.log(`❌ Échec de connexion : ${userid}`);
            res.status(401).json({ success: false, message: "ID ou mot de passe incorrect" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/* 🏠 ROUTE PRINCIPALE */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

/* 🟢 SOCKET.IO */
io.on("connection", (socket) => {
    console.log("🟢 Un joueur est en ligne :", socket.id);
});

/* 🚀 LANCEMENT DU SERVEUR */
server.listen(PORT, () => {
    console.log(`🚀 Ludobet tourne sur le port ${PORT}`);
});
