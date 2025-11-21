const Usuario = require("../models/usuariosModel");
const {
  cifrarSenha,
  compararSenha,
  gerarToken,
} = require("../middlewares/authMiddleware");

module.exports = {

  async criar(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
      }

      const senhaCifrada = cifrarSenha(senha);

      const novoUsuario = await Usuario.create({
        email,
        senha: senhaCifrada,
      });

      return res.status(201).json({
        _id: novoUsuario._id,
        email: novoUsuario.email,
      });
    } catch (err) {
      console.error(err);
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
  },


  async entrar(req, res) {
    try {
      const { usuario, senha } = req.body;

      if (!usuario || !senha) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
      }

      const usuarioEncontrado = await Usuario.findOne({
        email: usuario,
      });

      if (!usuarioEncontrado) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
      }

      const confere = compararSenha(senha, usuarioEncontrado.senha);

      if (!confere) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
      }

      const token = gerarToken({ email: usuario });

      return res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }
  },


  async renovar(req, res) {
    try {
      const token = gerarToken({ email: req.usuario.email });

      return res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ msg: "Token inválido" });
    }
  },


  async remover(req, res) {
    try {
      const { id } = req.params;

      await Usuario.findOneAndDelete({ _id: id });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Erro interno" });
    }
  },
};
