import React, { useState, useEffect } from "react";
import { fetchQuestionTypes, searchQuestions } from "../api";
import SearchBox from "../components/SearchBox";
import QuestionList from "../components/QuestionList";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import ScrollToTop from "../components/ScrollToTop";

export default function QuestionsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({ questions: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [view, setView] = useState("list");

  useEffect(() => {
    const loadQuestionTypes = async () => {
      try {
        const types = await fetchQuestionTypes();
        setQuestionTypes(types);
      } catch (error) {
        console.error("Error loading question types:", error);
      }
    };
    loadQuestionTypes();
  }, []);

  // Trigger search when query, typeFilter, or sortOrder changes
  useEffect(() => {
    setPage(1); // Resets to page 1 when filters change
    handleSearch();
  }, [query, typeFilter, sortOrder]);

  // Trigger search when page changes
  useEffect(() => {
    handleSearch();
  }, [page]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchQuestions(query, page, 10, typeFilter, sortOrder);
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (typeFilter) {
      return `Showing ${typeFilter} Questions`;
    }
    return "All Questions";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Title Bar */}
      <div className="md:hidden bg-orange-600 text-white p-4 fixed top-0 w-full z-50 shadow-lg">
        <h1 className="text-xl font-bold text-center">{getTitle()}</h1>
      </div>

      <div className="md:pl-64">
        {/* Desktop Heading */}
        <div className="hidden md:block bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-orange-600">{getTitle()}</h1>
        </div>

        {/* Main Content */}
        <main className="container mx-auto p-4 pt-20 md:pt-6">
          <SearchBox
            query={query}
            setQuery={setQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            questionTypes={questionTypes}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            view={view}
            setView={setView}
            onSearch={handleSearch}
          />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              <QuestionList questions={results.questions} view={view} sortOrder={sortOrder} />
              <Pagination
                page={page}
                total={results.total}
                limit={10}
                onPageChange={(newPage) => {
                  setPage(newPage); 
                }}
              />
            </>
          )}
        </main>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          questionTypes={questionTypes}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          view={view}
          setView={setView}
        />
      </div>

      <ScrollToTop />
    </div>
  );
}