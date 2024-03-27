const jwt = require('jsonwebtoken');
const Response = require('../helpers/response');
const User = require('../../models/user.model');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json(Response.unauthorized);
  }

  try {
    const decodedToken = jwt.verify(authorization, process.env.JWT);

    if (!decodedToken.id) {
      return res.status(401).json(Response.unauthorized);
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json(Response.unauthorized);
    }
    
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json(Response.unauthorized);
  }
};