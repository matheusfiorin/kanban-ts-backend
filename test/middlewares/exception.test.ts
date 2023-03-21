import { Response } from 'express';
import Exception from '../../src/exceptions/exception';
import { exceptionMiddleware } from '../../src/middlewares/exception';

describe('exceptionMiddleware', () => {
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  it('should return a JSON response with the error status and message if the error is an instance of Exception', () => {
    const error = new Exception(400, 'Bad Request');
    exceptionMiddleware(error, null, mockRes as Response, null);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ status: 400, message: 'Bad Request' });
  });

  it('should return a JSON response with a 500 status and "Internal server error." message if the error is not an instance of Exception', () => {
    const error = new Error('Unexpected error');
    exceptionMiddleware(error, null, mockRes as Response, null);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ status: 500, message: 'Internal server error.' });
  });
});