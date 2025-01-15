require('dotenv').config()
import { Request, Response, NextFunction } from 'express';
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/route');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).type('text/plain');
    res.send('Not found');
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));