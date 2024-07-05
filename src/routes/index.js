const Router = require("express").Router();
const Controllers = require("../controllers/index.js");

// http://ip:port/register
// http://ip:port/login

Router.route("/").get(Controllers.Front.Home);
Router.route("/register").get(Controllers.Front.Register);

Router.route("/api/register").post(Controllers.Api.Register);
Router.route("/api/login").post(Controllers.Api.Login);
Router.route('/api/rides').post(Controllers.Api.AddRide);

module.exports = Router;
