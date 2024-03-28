const bcrypt = require("bcrypt");
const User = require("../../../models/user.js");
const Response = require("../../../utils/helpers/response.js");

module.exports = async (req, res) => {
  try {
    // Log de la requête
    const timestamp = new Date().toISOString();
    if (req.method === "POST") {
      console.log(`\x1b[31m[${timestamp}] ${req.method} ${req.url}\x1b[0m`); // Requête POST en rouge
    } else if (req.method === "GET") {
      console.log(`\x1b[32m[${timestamp}] ${req.method} ${req.url}\x1b[0m`); // Requête GET en vert
    } else {
      console.log(`[${timestamp}] ${req.method} ${req.url}`); // Autres requêtes sans couleur
    }

    const users = await User.find();
    console.log(users);

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(
          new Response(400, "Mauvaise requête, veuillez vérifier les données.")
        );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json(new Response(404, "Utilisateur introuvable"));
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json(new Response(401, "Mot de passe invalide"));
    }

    // Génération du token JWT (non inclus dans la sortie de la console)
    // const token = jwt.sign({ id: existingUser._id }, process.env.JWT);

    return res.status(200).json(new Response(200, "Authentification réussie."));
  } catch (error) {
    console.error(error);
    return res.status(500).json(Response.error);
  }
};
