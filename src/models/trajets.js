const mongoose = require('mongoose')

const trajetSchema = new mongoose.Schema({
    arrive: { type: String, required: true },
    depart: { type: String, required: true },

    conducteur: { type: String, required: true },
    passagers: { type: Date, default: Date.now },

    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now()}
})

const User = mongoose.model('Trajets', trajetSchema)

module.exports = User
