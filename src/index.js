// Importation des dépendances
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const router = require("./router/index.js");
const endpoints = require("./routes/index.js");

// Importation des variables d'environnement pour utiliser process.env
dotenv.config();

const port = 5757;
const url =
  "mongodb+srv://atomservices:kirawasroot@cluster0.hpkikvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Définition de la fonction sur une constante
const app = express();

// Emplacement du frontend
app.use(express.static("/src/public"));
app.use(express.json());
app.use("/", endpoints);

//Connexion à la base de donnée et lancement de l'api
router.ConnectDB(mongoose, url);
router.LaunchServer(app, port);
