//importar o cliente do mongodb
require("dotenv").config();
const { MongoClient } = require("mongodb");


// string de conexão

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/`;

const client = new MongoClient(url);
let db = null;


async function conectar() {
  try {
    if (db == null){
        await client.connect();
        db = client.db("agenda_aula09");
    
    }
    console.log("Conectado ao MongoDB")
    return db;
  } catch (e) {
    console.log("Erro ao conectar no MongoDB", e.message);
  }
}

module.exports = conectar;
