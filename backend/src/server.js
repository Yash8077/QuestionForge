import express from 'express';
import cors from 'cors'; // Import the cors package
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import questionRoutes from './routes/question.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5000'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET'],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON request bodies

app.use('/api', questionRoutes); // Use question routes

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Start the server locally
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Export the app for Vercel
export default app;