const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Testes API - Prática 8', () => {
  let token;
  let tokenNovo;

  test('GET /produtos sem token → 401', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Não autorizado');
  });

  test('GET /produtos com token inválido → 401', async () => {
    const res = await request.get('/produtos').set('authorization', '123456789');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Token inválido');
  });

  test('POST /usuarios/login retorna token', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /produtos com token válido → 200', async () => {
    const res = await request.get('/produtos').set('authorization', token);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar retorna novo token', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    tokenNovo = res.body.token;
  });

  test('GET /produtos com token renovado → 200', async () => {
    const res = await request.get('/produtos').set('authorization', tokenNovo);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
