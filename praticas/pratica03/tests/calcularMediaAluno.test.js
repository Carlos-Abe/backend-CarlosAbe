const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('A função calcularMediaAluno deve estar definida', () => {
  expect(calcularMediaAluno).toBeDefined();
});


test('Deve lançar erro se a1 ou a2 não forem informados', () => {
  expect(() => calcularMediaAluno(undefined, 5)).toThrow("Notas a1 ou a2 não informadas");
  expect(() => calcularMediaAluno(7, undefined)).toThrow("Notas a1 ou a2 não informadas");
});


test('Deve lançar erro se a1 ou a2 forem negativos', () => {
  expect(() => calcularMediaAluno(-1, 5)).toThrow("Notas a1 ou a2 não podem ser negativas");
  expect(() => calcularMediaAluno(6, -2)).toThrow("Notas a1 ou a2 não podem ser negativas");
});


test('Deve calcular média base se a3 não for informada', () => {
  const resultado = calcularMediaAluno(5, 7);
  expect(resultado).toBeCloseTo(5 * 0.4 + 7 * 0.6);
});


test('Deve lançar erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(6, 8, -3)).toThrow("Nota a3 não pode ser negativa");
});


test('Deve calcular melhor média entre a1 e a3', () => {
  const resultado = calcularMediaAluno(9, 2, 10); 
  expect(resultado).toBeCloseTo(9 * 0.4 + 10 * 0.6);
});


test('Deve calcular melhor média entre a3 e a2', () => {
  const resultado = calcularMediaAluno(2, 9, 10); 
  expect(resultado).toBeCloseTo(10 * 0.4 + 9 * 0.6);
});
