import Router from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => res.send({ message: "Login successful" }))
authRouter.post('/register', (req, res) => res.send({ message: "Register successful" }))
authRouter.post('/logout', (req, res) => res.send({ message: "Logout successful" }))

export default authRouter;