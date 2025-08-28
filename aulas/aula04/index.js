function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a + b * -1;
}

function multiplicacao(a, b) {
  return a * b;
}

function divisao(a, b) {
    if (a !== 0 && b !== 0) 
        return a / b;
    else 
        throw new Error("Não é possível dividir por zero!");
  
}

export {soma, subtracao, multiplicacao, divisao}