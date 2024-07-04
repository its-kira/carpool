const path = require("path");

module.exports = {
  login: (req, res) => {
    try {
      return res.status(200).sendFile("./src/public/html/login.html");
    } catch (error) {
      console.error(error);
      return res.status(500).json(Response.error);
    }
  },

  register: (req, res) => {
    try {
      return res
        .status(200)
        .sendFile(path.resolve("./src/public/html/register.html"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(Response.error);
    }
  },
};
