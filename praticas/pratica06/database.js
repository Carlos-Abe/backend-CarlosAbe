require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/`;

const client = new MongoClient(url);
let db = null;

async function conectarDb() {
  try {
    if (db == null) {
      await client.connect();
      db = client.db("agendaPratica06");
      console.log("Conectado ao MongoDB com sucesso!");
    }
    return db;
  } catch (e) {
    console.error("Erro ao conectar no MongoDB:", e.message);
  }
}

module.exports = conectarDb;