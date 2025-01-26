import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all question types
export const fetchQuestionTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/question-types`);
    return response.data.types;
  } catch (error) {
    console.error('Error fetching question types:', error);
    throw error;
  }
};

// Search questions
export const searchQuestions = async (query, page, limit, type, sortOrder) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions`, {
      params: { query, page, limit, type, sortOrder }, // Include sortOrder
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};