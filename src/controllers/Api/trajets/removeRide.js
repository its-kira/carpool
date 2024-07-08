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

        // Suppression du document trajet dans la base de données MongoDB
        const removedRide = await Ride.findOneAndDelete({
            departureCity,
            arrivalCity,
            departureDate,
            departureHour,
            driverEmail
        });

        if (!removedRide) {
            return res.status(404).json(new Response(404, "Trajet non trouvé."));
        }

        return res.status(200).json(new Response(200, "Trajet supprimé avec succès."));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new Response(500, "Erreur interne du serveur."));
    }
};
