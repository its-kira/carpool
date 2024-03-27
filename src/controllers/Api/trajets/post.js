const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../models/user.js')
const Response = require('../../../utils/helpers/response.js')

module.exports = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error)
        return res.status(500).json(Response.error)
    }
}
