const tarefas = [];

function listar() {
  return tarefas;
}

function buscarPeloId(tarefaId) {
  const tarefa = tarefas.find(t => String(t.id) === String(tarefaId));
  return tarefa || null;
}

function criar(tarefa) {
  const id = Math.random().toString(36).substr(2, 4);
  const nova = Object.assign({}, tarefa, { id });
  tarefas.push(nova);
  return nova;
}

function atualizar(tarefa) {
  const idx = tarefas.findIndex(t => String(t.id) === String(tarefa.id));
  if (idx === -1) return null;
  tarefas[idx] = Object.assign({}, tarefas[idx], tarefa);
  return tarefas[idx];
}

function remover(tarefaId) {
  const idx = tarefas.findIndex(t => String(t.id) === String(tarefaId));
  if (idx === -1) return null;
  const removed = tarefas.splice(idx, 1)[0];
  return removed;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};
