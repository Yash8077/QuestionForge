import React, { useState, useEffect, useRef, useMemo } from "react";

export default function QuestionList({ questions, view, sortOrder }) {
  const [activeQuestionId, setActiveQuestionId] = useState(null); 
  const [currentWordIndex, setCurrentWordIndex] = useState(-1); 
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [anagramBlocks, setAnagramBlocks] = useState({}); 
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [anagramOrder, setAnagramOrder] = useState({}); 
  const utteranceRef = useRef(null); 

  // Sort questions based on sortOrder
  const sortedQuestions = useMemo(() => {
    if (sortOrder === "default") return questions;
    return [...questions].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title); 
      } else {
        return b.title.localeCompare(a.title); 
      }
    });
  }, [questions, sortOrder]);

  // Initialize anagram blocks and order
  useEffect(() => {
    const initialBlocks = {};
    const initialOrder = {};
    questions.forEach((q) => {
      if (q.type === "ANAGRAM" && q.blocks) {
        initialBlocks[q._id] = [...q.blocks].sort(() => Math.random() - 0.5); // Shuffle blocks
        initialOrder[q._id] = Array(q.blocks.length).fill(null);
      }
    });
    setAnagramBlocks(initialBlocks);
    setAnagramOrder(initialOrder);
  }, [questions]);

  // Handle MCQ option selection
  const handleOptionSelect = (questionId, optionIndex) => {
    if (!checkedAnswers[questionId]) {
      setSelectedOptions((prev) => ({ ...prev, [questionId]: optionIndex }));
    }
  };

  // Check MCQ answer and provide feedback
  const checkMcqAnswer = (questionId) => {
    setCheckedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  // Assign order to anagram blocks
  const assignOrder = (questionId, blockIndex) => {
    if (!checkedAnswers[questionId]) { 
      const currentOrder = anagramOrder[questionId] || [];
      const nextNumber = currentOrder.filter(Boolean).length + 1; 
      const newOrder = [...currentOrder];
      newOrder[blockIndex] = newOrder[blockIndex] ? null : nextNumber; 
      setAnagramOrder((prev) => ({ ...prev, [questionId]: newOrder }));
    }
  };

  // Check anagram answer and provide feedback
  const checkAnagramAnswer = (questionId) => {
    const question = questions.find((q) => q._id === questionId);
    if (!question || !question.blocks) return;

    const correctOrder = question.blocks.map((block) => block.text); 
    const userOrder = (anagramOrder[questionId] || [])
      .map((num, index) => ({ num, text: anagramBlocks[questionId][index].text }))
      .sort((a, b) => (a.num || 0) - (b.num || 0)) 
      .map((item) => item.text);

    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder); 
    setCheckedAnswers((prev) => ({ ...prev, [questionId]: isCorrect ? "correct" : "incorrect" }));
  };

  // Read text aloud with text-to-speech
  const readText = (text, questionId) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1.5;

      const words = text.split(" ");
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const charIndex = event.charIndex;
          const wordIndex = words.reduce(
            (acc, word, index) => {
              if (charIndex >= acc.offset && charIndex < acc.offset + word.length + 1) {
                return { index, offset: acc.offset + word.length + 1 };
              }
              return { index: acc.index, offset: acc.offset + word.length + 1 };
            },
            { index: 0, offset: 0 },
          ).index;

          setCurrentWordIndex(wordIndex); // Highlight current word
        }
      };

      utterance.onstart = () => {
        setActiveQuestionId(questionId); // Set active question
        setCurrentWordIndex(0); // Start highlighting
      };

      utterance.onend = () => {
        setActiveQuestionId(null); // Reset active question
        setCurrentWordIndex(-1); // Stop highlighting
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance); // Start speech
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  // Stop reading aloud
  const stopReading = () => {
    if (utteranceRef.current) {
      speechSynthesis.cancel(); // Stop speech
      setActiveQuestionId(null); 
      setCurrentWordIndex(-1); 
    }
  };

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Render individual question based on type
  const renderQuestion = (q) => {
    return (
      <div
        key={q._id}
        className={`bg-white rounded-lg shadow-md overflow-hidden 
          ${view === "list" ? "mb-4" : ""}
          ${view === "grid" ? "h-full" : ""}
        `}
      >
        {/* Question title and type chip */}
        <div className="p-6">
          <div className="flex flex-col gap-2 mb-2">
            <h3 className="font-semibold text-lg text-gray-800">{q.title}</h3>
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full w-fit 
                ${q.type === "MCQ" ? "bg-blue-100 text-blue-800" : ""}
                ${q.type === "ANAGRAM" ? "bg-green-100 text-green-800" : ""}
                ${q.type === "READ_ALONG" ? "bg-purple-100 text-purple-800" : ""}
                ${q.type === "CONVERSATION" ? "bg-blue-100 text-blue-800" : ""}
                ${q.type === "CONTENT_ONLY" ? "bg-green-100 text-green-800" : ""}
              `}
            >
              {q.type}
            </span>
          </div>

          {/* MCQ question rendering */}
          {q.type === "MCQ" && q.options && (
            <div className="space-y-2">
              {q.options.map((opt, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded cursor-pointer border transition-colors
                  ${selectedOptions[q._id] === index ? "bg-orange-100 border-orange-300" : "hover:bg-gray-50"}
                  ${checkedAnswers[q._id] && opt.isCorrectAnswer ? "bg-green-100 border-green-300" : ""}
                  ${checkedAnswers[q._id] && selectedOptions[q._id] === index && !opt.isCorrectAnswer ? "bg-red-100 border-red-300" : ""}`}
                >
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={index}
                    checked={selectedOptions[q._id] === index}
                    onChange={() => handleOptionSelect(q._id, index)}
                    disabled={checkedAnswers[q._id]}
                    className="mr-2"
                  />
                  {opt.text}
                </label>
              ))}
              <button
                onClick={() => checkMcqAnswer(q._id)}
                disabled={checkedAnswers[q._id]}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkedAnswers[q._id] ? "View Solution" : "Check Answer"}
              </button>
              {checkedAnswers[q._id] && (
                <div className="mt-4 text-sm">
                  {q.options[selectedOptions[q._id]]?.isCorrectAnswer ? (
                    <span className="text-green-600">✓ Correct Answer!</span>
                  ) : (
                    <span className="text-red-600">✗ Wrong Answer</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Anagram question rendering */}
          {q.type === "ANAGRAM" && q.blocks && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {anagramBlocks[q._id]?.map((block, index) => (
                  <div
                    key={index}
                    onClick={() => assignOrder(q._id, index)}
                    className={`p-2 border rounded cursor-pointer transition-colors relative
                    ${checkedAnswers[q._id] === "correct" && block.isAnswer ? "bg-green-100" : "bg-gray-50"}
                    hover:bg-orange-50`}
                  >
                    {block.text}
                    {(anagramOrder[q._id] || [])[index] && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {anagramOrder[q._id][index]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => checkAnagramAnswer(q._id)}
                  disabled={checkedAnswers[q._id]}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkedAnswers[q._id] ? "View Solution" : "Check Solution"}
                </button>
                {!checkedAnswers[q._id] && (
                  <button
                    onClick={() => {
                      setAnagramBlocks((prev) => ({
                        ...prev,
                        [q._id]: [...q.blocks].sort(() => Math.random() - 0.5),
                      }));
                      setAnagramOrder((prev) => ({
                        ...prev,
                        [q._id]: Array(q.blocks.length).fill(null),
                      }));
                    }}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Shuffle
                  </button>
                )}
              </div>
              {checkedAnswers[q._id] && checkedAnswers[q._id] !== "correct" && (
                <div className="mt-2 text-sm text-gray-600">Solution: {q.solution}</div>
              )}
            </div>
          )}

          {/* Read-along question rendering */}
          {q.type === "READ_ALONG" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                {q.title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={
                      activeQuestionId === q._id && index === currentWordIndex ? "font-bold text-orange-600" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => readText(q.title, q._id)}
                  disabled={activeQuestionId !== null}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activeQuestionId === q._id ? "Reading..." : "Read Aloud"}
                </button>
                {activeQuestionId === q._id && (
                  <button
                    onClick={stopReading}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render all questions in the selected view mode
  return (
    <div
      className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : ""}
      ${view === "list" ? "space-y-4" : ""}`}
    >
      {sortedQuestions.map(renderQuestion)}
    </div>
  );
}