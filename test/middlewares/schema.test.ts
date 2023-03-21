import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { wireToDomain } from '../../src/adapters/wire';
import { ExceptionHandler } from '../../src/exceptions/handler';
import schemaMiddleware from '../../src/middlewares/schema';
import { CardWire } from '../../src/models/card';

jest.mock('../../src/exceptions/handler', () => ({
  ExceptionHandler: {
    createException: jest.fn(),
    badRequest: jest.fn(),
  },
}));

describe('schemaMiddleware', () => {
  const mockRequest = (body: unknown): Request => ({
    body,
  } as Request);

  const mockResponse = (): Response => ({
    send: jest.fn(),
  } as unknown as Response);

  const mockNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next if the request body is valid', () => {
    const req = mockRequest({ titulo: 'Some Title', conteudo: 'Some Content', lista: 'Some List' });
    const res = mockResponse();

    schemaMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should return a bad request error if the request body is invalid', () => {
    const req = mockRequest({});
    const res = mockResponse();

    schemaMiddleware(req, res, mockNext);

    expect(ExceptionHandler.badRequest).toHaveBeenCalledWith(mockNext);
  });

  it('should convert the request body to domain format', () => {
    const req = mockRequest({ titulo: 'Some Title', conteudo: 'Some Content', lista: 'Some List' });
    const res = mockResponse();

    schemaMiddleware(req, res, mockNext);

    expect(req.body).toEqual(wireToDomain({ titulo: 'Some Title', conteudo: 'Some Content', lista: 'Some List' } as CardWire));
  });

  it('should allow unknown properties in the request body', () => {
    const req = mockRequest({ titulo: 'Some Title', conteudo: 'Some Content', lista: 'Some List', unknownProp: 'Some Value' });
    const res = mockResponse();

    schemaMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});