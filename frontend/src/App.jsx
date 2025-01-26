import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionsPage />} />
      </Routes>
    </Router>
  );
}