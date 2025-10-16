const conectar = require("./database");
const { ObjectId } = require("mongodb");

class Tarefa {
  db = null;
  collection = null;

  id = null;
  nome = null;
  concluida = false;

  constructor(nome) {
    this.nome = nome;
  }

  async init() {
    this.db = await conectar();
    this.collection = this.db.collection("tarefas");
  }

  async inserir() {
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;
  }

  async buscar() {
    const resultado = await this.collection.findOne({
      nome: this.nome,
    });
    if(resultado){
     this.id = resultado._id
    this.nome = resultado.nome;
    this.concluida = resultado.concluida;
    }
  }

  async alterar() {
    await this.collection.updateOne(
      {
        nome: this.nome,
      },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }

  async remover() {
    await this.collection.deleteOne({
      _id: this.id,
    });
  }
}


module.exports = Tarefa
