import { NextFunction, Request, Response } from 'express';

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  if ((req.method === 'PUT' || req.method === 'DELETE') && req.path.startsWith('/cards/')) {
    const dateTime = new Date().toLocaleString('pt-BR');
    const id = req.path.split('/')[2];
    const { titulo } = req.body;

    console.info(`${dateTime} - Card ${id} - ${titulo} - ${req.method === 'PUT' ? 'Alterar' : 'Remover'}`);
  }

  next();
}