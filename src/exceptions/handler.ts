import { NextFunction } from "express";
import Exception from './exception';

export class ExceptionHandler {
  static createException(status: number, message: string): Exception {
    return new Exception(status, message);
  }

  static badRequest(next: NextFunction, customMessage?: string): void {
    next(this.createException(400, customMessage || 'Bad request.'));
  }

  static unauthorized(next: NextFunction, customMessage?: string): void {
    next(this.createException(401, customMessage || 'Unauthorized access.'));
  }

  static notFound(next: NextFunction, customMessage?: string): void {
    next(this.createException(404, customMessage || 'Not found.'));
  }

  static internalServerError(next: NextFunction, customMessage?: string): void {
    next(this.createException(500, customMessage || 'Internal server error.'));
  }
}