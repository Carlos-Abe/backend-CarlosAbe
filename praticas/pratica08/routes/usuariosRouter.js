const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'email@exemplo.com' && senha === 'abcd1234') {
    const payload = { email: usuario };
    return res.json({ token: gerarToken(payload) });
  }

  return res.status(401).json({ msg: "Credenciais inválidas" });
});

router.post('/renovar', verificarToken, (req, res) => {
  const payload = { email: req.payload.email };
  return res.json({ token: gerarToken(payload) });
});

module.exports = router;
