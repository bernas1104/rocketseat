const express = require('express');

const routes = express.Router();

// Controllers
const ONGsController = require('./controllers/ONGsController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfilesController = require('./controllers/ProfilesController');
const SessionsController = require('./controllers/SessionsController');

// Routes
routes.get('/ongs', ONGsController.index);
routes.post('/ongs', ONGsController.create);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfilesController.index);
routes.post('/sessions', SessionsController.create);

module.exports = routes;