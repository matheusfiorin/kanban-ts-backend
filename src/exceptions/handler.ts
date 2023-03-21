import { NextFunction } from "express";
import Exception from './exception';

export class ExceptionHandler {
  static badRequest(next: NextFunction, customMessage?: string) {
    next(new Exception(400, customMessage || 'Bad request.'));
  }

  static unauthorized(next: NextFunction, customMessage?: string) {
    next(new Exception(401, customMessage || 'Unauthorized access.'));
  }

  static internalServerError(next: NextFunction, customMessage?: string) {
    next(new Exception(500, customMessage || 'Internal server error.'));
  }
}