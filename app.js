const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Remplacez bien la ligne ci-dessous avec VOTRE lien complet
const MONGO_URI = "mongodb+srv://abdifatahmahamoudahmed26_db_user:xDeD3w6qRywaT9rP@cluster0.qjw1boy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connecté à MongoDB Atlas"))
    .catch(err => console.error("❌ Erreur de connexion:", err));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'homme' },
    balance: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.static(__dirname));

app.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: "Erreur inscription" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { userid, password } = req.body;
        const user = await User.findOne({ userid, password });
        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => console.log(`🚀 Serveur actif sur le port ${PORT}`));
