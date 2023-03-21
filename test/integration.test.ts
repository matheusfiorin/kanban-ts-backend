import request from 'supertest';
import App from '../src/app';
import authRouter from '../src/routes/auth';
import cardRouter from '../src/routes/card';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, _) => {
    if (token !== 'fake-token') {
      throw new Error('');
    }
  }),
  sign: jest.fn(() => 'fake-token'),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'fake-uuid'),
}));

describe('App', () => {
  let app: App;

  beforeAll(() => {
    process.env = {
      ADMIN_USER: 'real-user',
      ADMIN_PASS: 'real-pass',
      JWT_SECRET: 'top-secret-do-not-open',
    }

    app = new App([authRouter, cardRouter]);
    app.listen();
  });

  afterAll(() => {
    app.close();
  })

  describe('POST /login', () => {
    it('should return 401 Unauthorized when user and pass are invalid', async () => {
      const response = await request(app.app)
        .post('/login')
        .send({ 'login': 'foo', 'senha': 'bar' });
      expect(response.status).toBe(401);
    });

    it('should return 200 OK when user and pass are valid', async () => {
      const response = await request(app.app)
        .post('/login')
        .send({ 'login': 'real-user', 'senha': 'real-pass' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual('fake-token');
    });
  });

  describe('GET /cards', () => {
    it('should return 401 Unauthorized when token is not provided', async () => {
      const response = await request(app.app)
        .get('/cards');
      expect(response.status).toBe(401);
    });
  });

  describe('POST /cards', () => {
    it('should return 401 Unauthorized when token is not provided', async () => {
      const response = await request(app.app)
        .post('/cards');
      expect(response.status).toBe(401);
    });

    it('should return 400 Bad Request when payload is incomplete or empty', async () => {
      const emptyResponse = await request(app.app)
        .post('/cards')
        .set('Authorization', 'Bearer fake-token');
      const incompleteResponse = await request(app.app)
        .post('/cards')
        .set('Authorization', 'Bearer fake-token')
        .send({ 'titulo': 't', 'conteudo': 'c' });
      expect(emptyResponse.status).toBe(400);
      expect(incompleteResponse.status).toBe(400);
    });
  });

  describe('PUT /cards/:id', () => {
    it('should return 401 Unauthorized when token is not provided', async () => {
      const response = await request(app.app)
        .put('/cards/fake-id');
      expect(response.status).toBe(401);
    });

    it('should return 400 Bad Request when payload is incomplete or empty', async () => {
      const emptyResponse = await request(app.app)
        .put('/cards/fake-id')
        .set('Authorization', 'Bearer fake-token');
      const incompleteResponse = await request(app.app)
        .put('/cards/fake-id')
        .set('Authorization', 'Bearer fake-token')
        .send({ 'titulo': 't', 'conteudo': 'c' });
      expect(emptyResponse.status).toBe(400);
      expect(incompleteResponse.status).toBe(400);
    });
  });

  describe('DELETE /cards/:id', () => {
    it('should return 401 Unauthorized when token is not provided', async () => {
      const response = await request(app.app)
        .put('/cards/fake-id');
      expect(response.status).toBe(401);
    });
  });

  describe('Card CRUD', () => {
    it('should create a new card', async () => {
      const response = await request(app.app)
        .post('/cards')
        .set('Authorization', 'Bearer fake-token')
        .send({ 'titulo': 't', 'conteudo': 'c', 'lista': 'l' });

      expect(response.status).toBe(201);
    });

    it('should get a list with the created card', async () => {
      const response = await request(app.app)
        .get('/cards')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ 'id': 'fake-uuid', 'titulo': 't', 'conteudo': 'c', 'lista': 'l' }]);
    });

    it('should update the card', async () => {
      const response = await request(app.app)
        .put('/cards/fake-uuid')
        .set('Authorization', 'Bearer fake-token')
        .send({ 'titulo': 'novo t', 'conteudo': 'novo c', 'lista': 'nova l' });

      expect(response.status).toBe(200);
    });

    it('should get a list with the updated card', async () => {
      const response = await request(app.app)
        .get('/cards')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ 'id': 'fake-uuid', 'titulo': 'novo t', 'conteudo': 'novo c', 'lista': 'nova l' }]);
    });

    it('should delete the card', async () => {
      const response = await request(app.app)
        .delete('/cards/fake-uuid')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
    });

    it('should get an empty list', async () => {
      const response = await request(app.app)
        .get('/cards')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  })
});
