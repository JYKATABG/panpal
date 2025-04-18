import Router from 'express';
import { checkAuth, login, logout, regiter } from '../controllers/auth.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.get("/check-auth", authorize, checkAuth);

authRouter.post('/register', regiter);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;