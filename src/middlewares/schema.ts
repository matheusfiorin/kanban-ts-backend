import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { wireToDomain } from '../adapters/wire';
import { ExceptionHandler } from '../exceptions/handler';
import { CardWire } from '../models/card';

const schema = Joi.object({
  titulo: Joi.string().required(),
  conteudo: Joi.string().required(),
  lista: Joi.string().required(),
});

export default function schemaMiddleware(req: Request, res: Response, next: NextFunction) {
  if (schema.validate(req.body, { allowUnknown: true }).error) {
    return ExceptionHandler.badRequest(next);
  }

  req.body = wireToDomain(req.body as CardWire);

  next();
}