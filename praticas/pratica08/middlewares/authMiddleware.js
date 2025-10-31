const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const tokenHeader = req.headers['authorization'];

  if (!tokenHeader) {
    return res.status(401).json({ msg: "Não autorizado" });
  }

  const token = tokenHeader.split(' ')[1] || tokenHeader;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  const expiresIn = 120;
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error("Erro ao gerar o token");
  }
}

module.exports = { verificarToken, gerarToken };
