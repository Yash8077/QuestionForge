import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all question types
export const fetchQuestionTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/question-types`);
    console.log("Fetched from: ",API_BASE_URL);
    return response.data.types;
  } catch (error) {
    console.error('Error fetching question types:', error);
    console.error('Backend URL:', API_BASE_URL); // Log the backend URL
    throw error;
  }
};

// Search questions
export const searchQuestions = async (query, page, limit, type, sortOrder) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions`, {
      params: { query, page, limit, type, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    console.error('Backend URL:', API_BASE_URL); // Log the backend URL
    throw error;
  }
};