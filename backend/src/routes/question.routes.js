import express from 'express';
import {Question}  from '../models/question.model.js';

const router = express.Router();

// Fetch all unique question types
router.get('/question-types', async (req, res) => {
  try {
    const types = await Question.distinct('type');
    res.json({ types });
  } catch (err) {
    console.error('Error fetching question types:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Search questions
router.get('/questions', async (req, res) => {
  const { query, page = 1, limit = 10, type, sortOrder } = req.query;

  const filter = {
    title: { $regex: query, $options: 'i' },
    ...(type && { type }),
  };

  // Add sorting based on sortOrder
  const sortOptions = {};
  if (sortOrder === 'asc') {
    sortOptions.title = 1;
  } else if (sortOrder === 'desc') {
    sortOptions.title = -1;
  }

  try {
    const [questions, total] = await Promise.all([
      Question.find(filter)
        .sort(sortOptions) // Apply sorting
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Question.countDocuments(filter),
    ]);

    res.json({ questions, total });
  } catch (err) {
    console.error('Error searching questions:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
export default router;

