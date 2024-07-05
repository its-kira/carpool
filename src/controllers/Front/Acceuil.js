const Response = require("../../utils/helpers/response.js");
const path = require("path");

module.exports = async (req, res) => {
    try {
        return res.status(200).sendFile(path.resolve("./src/public/html/Acceuil.html"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(Response.error);
    }
};
