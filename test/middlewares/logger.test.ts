import { NextFunction, Request, Response } from 'express';
import loggerMiddleware from '../../src/middlewares/logger';

describe('loggerMiddleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  it('should call next function', () => {
    loggerMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should log the card information when method is PUT', () => {
    req.method = 'PUT';
    req.path = '/cards/1';
    req.body = { titulo: 'New Title' };

    const consoleInfoMock = jest.spyOn(console, 'info').mockImplementation();

    loggerMiddleware(req, res, next);

    expect(consoleInfoMock).toHaveBeenCalledWith(
      expect.stringContaining('Card 1 - New Title - Alterar')
    );
  });

  it('should log the card information when method is DELETE', () => {
    req.method = 'DELETE';
    req.path = '/cards/2';
    req.body = { titulo: 'Another Title' };

    const consoleInfoMock = jest.spyOn(console, 'info').mockImplementation();

    loggerMiddleware(req, res, next);

    expect(consoleInfoMock).toHaveBeenCalledWith(
      expect.stringContaining('Card 2 - Another Title - Remover')
    );
  });
});