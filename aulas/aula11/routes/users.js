const express = require("express");
const { gerarToken, verificarToken, cifrarSenha, compararSenha } = require("../middlewares/auth");
const Usuario = require("../models/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const novoUsuario = await Usuario.create({ 
    username, 
    password: cifrarSenha(password) 
  });
  res.status(201).json({ 
    id: novoUsuario._id, 
    username: novoUsuario.username
  });
});

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  const usuarioEncontrado = await Usuario.findOne({username});

  if (usuarioEncontrado && compararSenha(password, usuarioEncontrado.password) ) {
    const payload = {
      iss: "Minha API",
      email: username,
      nome: "Jose",
      perfil: "admin",
    };
    try {
      return res.json({ token: gerarToken(payload) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  return res.status(401).json({ msg: "Credenciais invalidas" });
});

router.post("/renovar", verificarToken, function (req, res) {
  try {
    const payload = {
      iss: req.payload.iss,
      email: req.payload.email,
      nome: req.payload.nome,
      perfil: req.payload.perfil,
    };
    return res.json({ token: gerarToken(payload) });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
