require('dotenv').config();
const express = require('express');

const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

app.get('/', (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
