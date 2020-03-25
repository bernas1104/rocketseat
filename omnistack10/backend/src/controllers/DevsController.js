const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        return res.json(await Dev.find());
    },

    async create(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        // Looks for an existing Dev on the DB
        let dev = await Dev.findOne({ github_username });
        
        // If doesn't exist on DB, create it!
        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;    // name = login ==> default value
            
            // Creates a location, as per MongoDB docs
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
    
            const techsArray = parseStringAsArray(techs);

            dev = await Dev.create({ github_username, name, avatar_url, bio,
                                     techs: techsArray, location });

            // Filtrar conexões no raio máximo de 10km e com pelo menos uma tech
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return res.json(dev);
    },
};