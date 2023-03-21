import { NextFunction, Request, Response, Router } from 'express';
import { domainToWire } from '../adapters/wire';
import { Database } from '../controllers/database';
import { ExceptionHandler } from '../exceptions/handler';
import { authMiddleware } from '../middlewares/auth';
import schemaMiddleware from '../middlewares/schema';
import { Card } from '../models/card';

const cardRouter = Router();

cardRouter.get('/cards', authMiddleware, async (_, res: Response, next: NextFunction) => {
  try {
    const cards = (await Database.readCards()).map((e) => domainToWire(e));

    res.json(cards);
  } catch (_) {
    return ExceptionHandler.internalServerError(next);
  }
});

cardRouter.post('/cards', authMiddleware, schemaMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdCard = await Database.createCard(req.body as Card);

    res.status(201).json(createdCard);
  } catch (err) {
    return ExceptionHandler.internalServerError(next);
  }
});

cardRouter.put('/cards/:id', authMiddleware, schemaMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedCard = await Database.updateCard(id, req.body as Card);

    res.json(updatedCard);
  } catch (_) {
    return ExceptionHandler.internalServerError(next);
  }
});

cardRouter.delete('/cards/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await Database.deleteCard(id);

    const cards = await Database.readCards();

    res.json(cards);
  } catch (_) {
    return ExceptionHandler.internalServerError(next);
  }
});

export default cardRouter;
