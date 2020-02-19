const express = require('express');
const mongoose = require('mongoose')
const requireDir = require('require-dir');
const cors = require('cors'); // Estudar: Cross-Origin Resource Sharing

// Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB
// mongodb://localhost:27017/nodeapi (servidor, porta, schema)
mongoose.connect(
    'mongodb://localhost:27017/nodeapi',
    { useNewUrlParser: true, useUnifiedTopology: true },
);
requireDir('./src/models');

const Product = mongoose.model('Product');

// Rotas
app.use('/api', require('./src/routes'));

// Porta de acesso
app.listen(3001);