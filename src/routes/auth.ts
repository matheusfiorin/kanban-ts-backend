import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { ExceptionHandler } from '../exceptions/handler';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const { login, senha } = req.body;
  const { ADMIN_USER, ADMIN_PASS, JWT_SECRET } = process.env;

  if (login === ADMIN_USER && senha === ADMIN_PASS) {
    const token = jwt.sign({ user: ADMIN_USER }, JWT_SECRET, { expiresIn: '1h' });
    return res.json(token);
  }

  ExceptionHandler.unauthorized(next);
});

export default authRouter;
