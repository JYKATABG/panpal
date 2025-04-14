import express from 'express';
import { NODE_ENV, PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);

})