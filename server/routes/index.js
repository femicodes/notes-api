import { Router } from 'express';
import Response from '../utils/Response';
import authRoute from './auth';
import noteRoute from './notes';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  Response.success(res, 200, 'Welcome to the Notes API ');
});

mainRouter.use('/auth', authRoute);
mainRouter.use('/notes', noteRoute);

export default mainRouter;
