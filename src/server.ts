import App from './app';
import authRouter from './routes/auth';
import cardRouter from './routes/card';

new App([authRouter, cardRouter]).listen();