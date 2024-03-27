const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../../models/user.js");
const Response = require("../../../utils/helpers/response.js");

module.exports = async (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      console.error(err);
    });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(new Response(400, "Mauvaise requête vérifiez les données."));
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
      return res.status(401).json(new Response(401, "Mot de passe invalid!"));
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT);

    return res.status(200).json(new Response(200, { token }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(Response.error);
  }
};
