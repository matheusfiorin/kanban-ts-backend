import { Response } from 'express';
import Exception from '../exceptions/exception';

export function exceptionMiddleware(err: Error, _, res: Response, __) {
  if (err instanceof Exception) {
    res.status(err.status).json(err.toJSON());
  } else {
    res.status(500).json({ status: 500, message: 'Internal server error.' });
  }
}