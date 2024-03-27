const bcrypt = require("bcrypt");
const User = require("../../../models/user.js");
const Response = require("../../../utils/helpers/response.js");

module.exports = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json(
          new Response(400, "Mauvaise requête, veuillez vérifier les données.")
        );

    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password || password.length < 6) {
      return res
        .status(400)
        .json(
          new Response(400, "Mauvaise requête, veuillez vérifier les données.")
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(403)
        .json(new Response(403, "L'adresse email est déjà utilisée."));
    }

    // Hash du mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(12)
    );

    // Création du document utilisateur dans la base de données MongoDB
    const newUser = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    return res
      .status(201)
      .json(new Response(201, "Utilisateur créé avec succès."));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new Response(500, "Erreur interne du serveur."));
  }
};
