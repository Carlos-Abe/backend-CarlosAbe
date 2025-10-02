const request = require('supertest');
const app = require('../app');

let createdId = null;

describe('API de Tarefas - Prática 5', () => {
  test('GET /tarefas retorna 200 e JSON', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('POST /tarefas cria tarefa e retorna 201 + JSON', async () => {
    const payload = { nome: 'Estudar Node', concluida: false };
    const res = await request(app).post('/tarefas').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  test('GET /tarefas/:id retorna 200 e JSON para tarefa existente', async () => {
    const res = await request(app).get(`/tarefas/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id', createdId);
  });

  test('GET /tarefas/1 retorna 404 e JSON', async () => {
    const res = await request(app).get('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('PUT /tarefas/:id atualiza e retorna 200 + JSON', async () => {
    const payload = { nome: 'Estudar Node e Express', concluida: true };
    const res = await request(app).put(`/tarefas/${createdId}`).send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('nome', payload.nome);
    expect(res.body).toHaveProperty('concluida', payload.concluida);
  });

  test('PUT /tarefas/1 retorna 404 e JSON', async () => {
    const res = await request(app).put('/tarefas/1').send({ nome: 'x' });
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('DELETE /tarefas/:id retorna 204 sem conteúdo', async () => {
    const res = await request(app).delete(`/tarefas/${createdId}`);
    expect(res.statusCode).toBe(204);
    expect(res.text).toBe('');
  });

  test('DELETE /tarefas/1 retorna 404 e JSON', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
