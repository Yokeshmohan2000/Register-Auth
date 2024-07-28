import express from 'express';
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import connectDB from './utils/db';

const app = express();

connectDB();

app.use(cors())
app.use(express.json());
app.use('/api', userRoutes);

export default app;
