import React from "react";
import { Filter, Grid, List, AlignJustify } from "lucide-react";

const Sidebar = ({ questionTypes, typeFilter, setTypeFilter, sortOrder, setSortOrder, view, setView }) => {
  // Function to handle chip selection
  const handleTypeFilter = (type) => {
    if (typeFilter.includes(type)) {
      // If the type is already selected, remove it
      setTypeFilter(typeFilter.filter((t) => t !== type));
    } else {
      // If the type is not selected, add it
      setTypeFilter([...typeFilter, type]);
    }
  };

  // Function to get chip color based on type
  const getChipColor = (type) => {
    switch (type) {
      case "MCQ":
        return "bg-blue-100 text-blue-800";
      case "ANAGRAM":
        return "bg-green-100 text-green-800";
      case "READ_ALONG":
        return "bg-purple-100 text-purple-800";
      case "CONVERSATION":
        return "bg-indigo-100 text-indigo-800";
      case "CONTENT_ONLY":
        return "bg-pink-100 text-pink-800";
      case "TRUE_FALSE":
        return "bg-yellow-100 text-yellow-800";
      case "SHORT_ANSWER":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="w-64 bg-gray-100 h-screen fixed left-0 top-0 overflow-y-auto p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>

      {/* Question Type Filter Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center text-gray-700">
          <Filter className="mr-2" size={18} />
          Question Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {/* "All Questions" Chip */}
          <button
            onClick={() => setTypeFilter([])}
            className={`px-3 py-1 rounded-full text-sm transition-colors
              ${
                typeFilter.length === 0
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            ALL
          </button>
          {/* Question Type Chips */}
          {questionTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`px-3 py-1 rounded-full text-sm transition-colors
                ${getChipColor(type)}
                ${
                  typeFilter.includes(type)
                    ? "ring-2 ring-offset-2 ring-orange-500"
                    : "hover:bg-opacity-80"
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Order Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center text-gray-700">
          <AlignJustify className="mr-2" size={18} />
          Sort Order
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSortOrder("default")}
            className={`px-3 py-1 rounded-full text-sm transition-colors
              ${
                sortOrder === "default"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            Default
          </button>
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-3 py-1 rounded-full text-sm transition-colors
              ${
                sortOrder === "asc"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            Ascending
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-3 py-1 rounded-full text-sm transition-colors
              ${
                sortOrder === "desc"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            Descending
          </button>
        </div>
      </div>

      {/* View Options Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center text-gray-700">
          View Options
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg flex items-center justify-center transition-colors
              ${
                view === "grid"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg flex items-center justify-center transition-colors
              ${
                view === "list"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;