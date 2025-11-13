const express = require('express');
const app = express();
const apidocsRouter = require('./routes/apidocsRouter');

// Middleware para ler JSON
app.use(express.json());

// Middleware para o Swagger
app.use('/api-docs', apidocsRouter);

// Exporta o app
module.exports = app;
