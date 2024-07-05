const Ride = require('../../../models/ride');
const Response = require('../../../utils/helpers/response.js');

module.exports = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json(new Response(400, "Mauvaise requête, veuillez vérifier les données."));

        const { departureCity, arrivalCity, departureDate, departureHour, driverEmail } = req.body;

        if (!departureCity || !arrivalCity || !departureDate || !departureHour || !driverEmail) {
            return res.status(400).json(new Response(400, "Mauvaise requête, veuillez vérifier les données."));
        }

        // Création du document trajet dans la base de données MongoDB
        const newRide = await Ride.create({
            departureCity,
            arrivalCity,
            departureDate,
            departureHour,
            driverEmail
        });

        return res.status(201).json(new Response(201, "Trajet créé avec succès."));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new Response(500, "Erreur interne du serveur."));
    }
};
