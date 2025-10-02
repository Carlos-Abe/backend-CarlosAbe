const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  return res.json(resultado);
}

function buscarPeloId(req, res) {
  const tarefaId = req.params.tarefaId;
  const resultado = tarefaModel.buscarPeloId(tarefaId);
  if (resultado) {
    return res.json(resultado);
  }
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

function criar(req, res) {
  const tarefa = req.body;
  const resultado = tarefaModel.criar(tarefa);
  return res.status(201).json(resultado);
}

function atualizar(req, res) {
  const tarefaId = req.params.tarefaId;
  const tarefa = Object.assign({}, req.body, { id: tarefaId });
  const resultado = tarefaModel.atualizar(tarefa);
  if (resultado) {
    return res.json(resultado);
  }
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

function remover(req, res) {
  const tarefaId = req.params.tarefaId;
  const resultado = tarefaModel.remover(tarefaId);
  if (resultado) {
    return res.status(204).send();
  }
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};
