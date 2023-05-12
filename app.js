import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
export default dotenv.config();
import moviesRouter from './routes/movies.routes.js';
import authRouter from './routes/auth.routes.js';
import run from './config/db.js';
import verifyToken from './middlewares/authMiddleware.js';
import cors from 'cors';

const app = express();

// DB
run();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
// app.use('/api', verifyToken, moviesRouter);
app.use('/api', moviesRouter);

// Port
const PORT = process.env.PORT || 3000;

// Server On
app.listen(PORT, () => {
	console.log('Server on PORT', PORT);
});
