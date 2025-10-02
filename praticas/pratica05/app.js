const express = require('express');
const app = express();

app.use(express.json());


const tarefaRouter = require('./routes/tarefaRouter');
app.use('/tarefas', tarefaRouter);


module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
