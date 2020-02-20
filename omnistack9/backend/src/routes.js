const express = require('express');

const routes = express.Router();

// req.query => acessar os parâmetros da query
// req.params => acessar os parâmetros da rota
// req.body => acessar corpo da requisição

routes.get('/', (req, res) => {
    return res.json({
        "hello": "Hello, World!!",
    });
});

module.exports = routes;