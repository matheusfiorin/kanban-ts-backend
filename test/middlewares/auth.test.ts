import jwt from 'jsonwebtoken';
import { ExceptionHandler } from '../../src/exceptions/handler';
import { authMiddleware } from '../../src/middlewares/auth';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../../src/exceptions/handler', () => ({
  ExceptionHandler: {
    createException: jest.fn(),
    unauthorized: jest.fn(),
  },
}));

describe('authMiddleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the next function if the auth token is valid', () => {
    req.headers.authorization = 'Bearer valid-token';
    process.env.JWT_SECRET = 'secret';
    jwt.verify.mockReturnValueOnce({ userId: 'user123' });

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'secret');
    expect(next).toHaveBeenCalled();
  });

  it('should return an unauthorized error if the auth token is missing', () => {
    authMiddleware(req, res, next);

    expect(jwt.verify).not.toHaveBeenCalled();
    expect(ExceptionHandler.unauthorized).toHaveBeenCalledWith(next, 'Auth token is missing.');
  });

  it('should return an unauthorized error if the auth token is invalid', () => {
    req.headers.authorization = 'Bearer invalid-token';
    process.env.JWT_SECRET = 'secret';
    jwt.verify.mockImplementationOnce(() => {
      throw new Error();
    });

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('invalid-token', 'secret');
    expect(ExceptionHandler.unauthorized).toHaveBeenCalledWith(next, 'Auth token is invalid.');
  });
});
