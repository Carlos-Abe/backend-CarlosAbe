// index.js
const readline = require("readline-sync");
const controlador = require("./controlador");

function menu() {
  console.log("\n===== MENU =====");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      console.log("Tarefa adicionada com sucesso!");
      break;

    case "2":
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nomeBuscar);
      if (tarefa.id) {
        console.log("Tarefa encontrada:");
        console.log("ID:", tarefa.id);
        console.log("Nome:", tarefa.nome);
        console.log("Concluida:", tarefa.concluida);
      } else {
        console.log("Tarefa nao encontrada.");
      }
      break;

    case "3":
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluida = readline.question("Concluida? (true/false): ") === "true";
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      console.log("Tarefa atualizada com sucesso!");
      break;

    case "4":
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nomeRemover);
      console.log("Tarefa removida com sucesso!");
      break;

    case "5":
      console.log("Saindo...");
      process.exit();
      break;

    default:
      console.log("Opção invalida!");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao);
  }
}

main();
