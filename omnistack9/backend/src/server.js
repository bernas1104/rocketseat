const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://bernas1104:110492-Bb@omnistack-9sqiq.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3000);   // Utiliza a porta 3000

// req.query ==> Acessar query params (para filtros)
// req.params ==> Acessar route params (para edição/delete)
// req.body ==> Acessar corpo da requisição (para criação/edição)