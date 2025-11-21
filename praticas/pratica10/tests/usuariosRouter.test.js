const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let savedId = null;
let savedToken = null;

describe('/usuarios routes', () => {
  jest.setTimeout(30000);

  test('POST /usuarios - cria usuário (201)', async () => {
    const res = await request.post('/usuarios').send({ email: 'usuario@email.com', senha: 'abcd1234' });
    expect(res.status).toBe(201);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('usuario@email.com');
    savedId = res.body._id;
  });

  test('POST /usuarios - sem body (422)', async () => {
    const res = await request.post('/usuarios').send({});
    expect(res.status).toBe(422);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  test('POST /usuarios/login - com credenciais válidas (200)', async () => {
    const res = await request.post('/usuarios/login').send({ usuario: 'usuario@email.com', senha: 'abcd1234' });
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
    savedToken = res.body.token;
  });

  test('POST /usuarios/login - sem body (401)', async () => {
    const res = await request.post('/usuarios/login').send({});
    expect(res.status).toBe(401);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  test('POST /usuarios/renovar - com token válido (200)', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', `Bearer ${savedToken}`).send();
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar - token inválido (401)', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789').send();
    expect(res.status).toBe(401);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token invalido');
  });

  test('DELETE /usuarios/:id - com token válido (204)', async () => {
    const res = await request.delete(`/usuarios/${savedId}`).set('authorization', `Bearer ${savedToken}`).send();
    expect(res.status).toBe(204);
  });
});
