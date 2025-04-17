import express from 'express';
import { NODE_ENV, PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import recipeRouter from './routes/recipe.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/db.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser'
import arjcetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(arjcetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);

    await connectToDatabase();
})