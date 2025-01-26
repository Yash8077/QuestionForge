import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import questionRoutes from './routes/question.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON request bodies

app.use('/api', questionRoutes); // Use question routes

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});