import React from "react";
import { Search } from "lucide-react";

export default function SearchBox({
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  questionTypes,
  sortOrder,
  setSortOrder,
  view,
  setView,
  onSearch,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col gap-4">
        {/* Search Input with Icon */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Search questions..."
            className="w-full p-3 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            size={20}
            onClick={onSearch}
          />
        </div>

        {/* Dropdowns for Filters and Sort Order (Mobile View) */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {/* Question Type Filter Dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Types</option>
            {questionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Sort Order Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="default">Default Sort</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}