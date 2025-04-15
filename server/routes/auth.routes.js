import Router from 'express';
import { login, regiter } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', regiter);
authRouter.post('/login', login);

export default authRouter;