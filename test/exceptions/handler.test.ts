import Exception from '../../src/exceptions/exception';
import { ExceptionHandler } from '../../src/exceptions/handler';

describe('ExceptionHandler', () => {
  describe('createException', () => {
    it('should create an exception with the given status and message', () => {
      const status = 400;
      const message = 'Bad request.';
      const exception = ExceptionHandler.createException(status, message);
      expect(exception).toBeInstanceOf(Exception);
      expect(exception.status).toBe(status);
      expect(exception.message).toBe(message);
    });
  });

  describe('badRequest', () => {
    it('should call next with a 400 Bad Request exception by default', () => {
      const next = jest.fn();
      ExceptionHandler.badRequest(next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(400);
      expect(exception.message).toBe('Bad request.');
    });

    it('should call next with a custom exception message when provided', () => {
      const next = jest.fn();
      const customMessage = 'Custom message';
      ExceptionHandler.badRequest(next, customMessage);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(400);
      expect(exception.message).toBe(customMessage);
    });
  });

  describe('unauthorized', () => {
    it('should call next with a 401 Unauthorized exception by default', () => {
      const next = jest.fn();
      ExceptionHandler.unauthorized(next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(401);
      expect(exception.message).toBe('Unauthorized access.');
    });

    it('should call next with a custom exception message when provided', () => {
      const next = jest.fn();
      const customMessage = 'Custom message';
      ExceptionHandler.unauthorized(next, customMessage);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(401);
      expect(exception.message).toBe(customMessage);
    });
  });

  describe('notFound', () => {
    it('should call next with a 404 Not Found exception by default', () => {
      const next = jest.fn();
      ExceptionHandler.notFound(next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(404);
      expect(exception.message).toBe('Not found.');
    });

    it('should call next with a custom exception message when provided', () => {
      const next = jest.fn();
      const customMessage = 'Custom message';
      ExceptionHandler.notFound(next, customMessage);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(404);
      expect(exception.message).toBe(customMessage);
    });
  });

  describe('internalServerError', () => {
    it('should call next with a 500 Internal Server Error exception by default', () => {
      const next = jest.fn();
      ExceptionHandler.internalServerError(next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(500);
      expect(exception.message).toBe('Internal server error.');
    });

    it('should call next with a custom exception message when provided', () => {
      const next = jest.fn();
      const customMessage = 'Custom message';
      ExceptionHandler.internalServerError(next, customMessage);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Exception));
      const exception = next.mock.calls[0][0] as Exception;
      expect(exception.status).toBe(500);
      expect(exception.message).toBe(customMessage);
    });
  });
});