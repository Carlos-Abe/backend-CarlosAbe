require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const apidocsRouter = require("./routes/apidocsRouter");
const usuariosRouter = require("./routes/usuariosRouter");

const app = express();


const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE,
} = process.env;

const mongoURL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) =>
    console.error("Erro ao conectar ao MongoDB:", err.message || err)
  );


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/api-docs", apidocsRouter);
app.use("/usuarios", usuariosRouter);



app.use((req, res, next) => {
  res.status(404).json({ msg: "Rota não encontrada" });
});



app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    msg: err.message || "Erro interno",
  });
});

module.exports = app;
