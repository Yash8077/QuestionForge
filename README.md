# **QuestionForge**

**QuestionForge** is a lightweight and efficient platform designed to **fetch, filter, and display questions** stored in a MongoDB database. It provides a simple and intuitive interface for searching and interacting with questions, making it ideal for educators, trainers, or anyone who needs quick access to a collection of questions.



## **Features**

### **1. Fetch Questions from MongoDB**
- **Fetch All Questions**: Retrieve all questions stored in the MongoDB database.
- **Filter by Type**: Narrow down questions by their type (e.g., MCQ, Anagram, Read-Along).
- **Search by Title**: Search for questions by title using case-insensitive regex matching.

### **2. Sorting and Pagination**
- **Sort by Title**: Sort questions in ascending or descending order based on their title.
- **Pagination**: Browse through large sets of questions with pagination support.
- **Customizable Limits**: Set the number of questions displayed per page.

### **3. Interactive Question Display**
- **MCQ Questions**: Display multiple-choice questions with options.
- **Anagram Questions**: Show anagram puzzles with draggable blocks.
- **Read-Along Questions**: Highlight words as they are read aloud using text-to-speech.

### **4. Responsive Design**
- **Mobile-Friendly**: Access and interact with questions on any device.
- **Desktop Optimization**: Enjoy a seamless experience on larger screens.



## **Tech Stack**

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: RESTful API for fetching questions
- **Text-to-Speech**: Web Speech API



## **Installation**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### **Steps**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/QuestionForge.git
   cd QuestionForge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Start the Frontend**
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.



## **Usage**

### **1. Fetch Questions**
- Questions are automatically fetched from the MongoDB database when the application loads.
- Use the search bar to filter questions by title.

### **2. Filter by Type**
- Use the sidebar or dropdown menu to filter questions by type (e.g., MCQ, Anagram, Read-Along).

### **3. Sort Questions**
- Sort questions by title in ascending or descending order using the sort options.

### **4. Paginate Through Questions**
- Use the pagination controls to navigate through large sets of questions.
- Adjust the number of questions displayed per page for a customized experience.

### **5. Interact with Questions**
- **MCQ Questions**: Select an option to check if it's correct.
- **Anagram Questions**: Rearrange blocks to form the correct answer.
- **Read-Along Questions**: Listen to the text and follow along with highlighted words.



## **API Endpoints**

### **1. Fetch All Question Types**
- **GET `/api/question-types`**
  - Fetches all unique question types from the database.
  - Example Response:
    ```json
    {
      "types": ["MCQ", "ANAGRAM", "READ_ALONG"]
    }
    ```

### **2. Fetch Questions**
- **GET `/api/questions`**
  - Fetches questions based on query parameters:
    - `query`: Search term for question titles.
    - `type`: Filter by question type.
    - `sortOrder`: Sort by title (`asc` or `desc`).
    - `page`: Page number for pagination.
    - `limit`: Number of questions per page.
  - Example Response:
    ```json
    {
      "questions": [
        {
          "_id": "12345",
          "type": "MCQ",
          "title": "What is the capital of France?",
          "options": [
            { "text": "Paris", "isCorrectAnswer": true },
            { "text": "London", "isCorrectAnswer": false }
          ]
        }
      ],
      "total": 50
    }
    ```



## **Future Enhancements**

While the current version of **QuestionForge** focuses on fetching and displaying questions, future updates may include:
- **Question Creation**: Allow users to add new questions to the database.
- **Question Editing**: Enable users to update or delete existing questions.
- **User Authentication**: Add user accounts to save and manage personalized question sets.
- **Advanced Analytics**: Provide insights into question usage and performance.



## **Contributing**

We welcome contributions! If you'd like to contribute to QuestionForge, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Submit a pull request.



## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.



## **Acknowledgments**

- **Lucide Icons** for providing beautiful and consistent icons.
- **Tailwind CSS** for making styling a breeze.
- **Web Speech API** for enabling text-to-speech functionality.



## **Contact**

For questions, feedback, or support, please reach out to:

- **Yash Mishra**  
  Email: ymishra502@gmail.com  



**QuestionForge** is your go-to tool for fetching and interacting with questions stored in MongoDB. Start exploring your question collection today! 🚀
