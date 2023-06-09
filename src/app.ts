import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Router } from 'express';
import { Database } from './controllers/database';
import { exceptionMiddleware } from './middlewares/exception';
import loggerMiddleware from './middlewares/logger';

class App {
  public app: Application;
  private server;
  private port: string;

  constructor(routers: Router[]) {
    dotenv.config();

    this.app = express();
    this.port = process.env.PORT || '5000';

    this.initializeExpress();
    this.initializeDatabase();
    this.initializeEarlyMiddlewares();
    this.initializeRouters(routers);
    this.initializeLateMiddlewares();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      console.info(`⚡️ Server is running at http://localhost:${this.port}`);
    });
  }

  public close() {
    this.server.close();
  }

  private initializeExpress() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initializeDatabase() {
    Database.start();
  }

  private initializeRouters(routers: Router[]) {
    routers.forEach((r) => {
      this.app.use(r);
    });
  }

  private initializeEarlyMiddlewares() {
    this.app.use(loggerMiddleware);
  }

  private initializeLateMiddlewares() {
    this.app.use(exceptionMiddleware);
  }
}

export default App;
