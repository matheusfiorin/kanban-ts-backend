import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExceptionHandler } from '../exceptions/handler';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return ExceptionHandler.unauthorized(next, 'Auth token is missing.');
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return ExceptionHandler.unauthorized(next, 'Auth token is invalid.');
  }
};