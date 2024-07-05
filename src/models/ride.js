// models/ride.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureDate: { type: String, required: true }, // Consider using Date type for actual date representation
    departureHour: { type: String, required: true },
    driverEmail: { type: String, required: true }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
