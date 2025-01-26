import React, { useState } from "react";

export default function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit); // This calculates total pages based on total items and items per page
  const [customPage, setCustomPage] = useState("");

  const handleCustomPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(customPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) { 
      onPageChange(pageNumber); 
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex gap-4">
        <button
          disabled={page === 1} // This disables "Previous" on the first page
          onClick={() => onPageChange(page - 1)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white rounded-lg shadow">
          Page {page} of {totalPages} {/* This displays current page and total pages */}
        </span>
        <button
          disabled={page >= totalPages} // Disables "Next" on the last page
          onClick={() => onPageChange(page + 1)} 
          className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        >
          Next
        </button>
      </div>

      {/* Allows user to input Custom page */}
      <form onSubmit={handleCustomPage} className="flex gap-2">
        <input
          type="number"
          value={customPage}
          onChange={(e) => setCustomPage(e.target.value)} 
          min="1"
          max={totalPages}
          placeholder="Go to page"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-28"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        >
          Go
        </button>
      </form>
    </div>
  );
}