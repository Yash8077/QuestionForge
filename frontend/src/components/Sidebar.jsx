import React from "react";
import { Filter, Grid, List, AlignJustify } from "lucide-react";

const Sidebar = ({ questionTypes, typeFilter, setTypeFilter, sortOrder, setSortOrder, view, setView }) => {
  return (
    <div className="w-64 bg-gray-100 h-screen fixed left-0 top-0 overflow-y-auto p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
      
      {/* Question Type Filter Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center text-gray-700">
          <Filter className="mr-2" size={18} />
          Question Type
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="typeFilter"
              value=""
              checked={typeFilter === ""}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="mr-2 form-radio text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-600">All Questions</span>
          </label>
          {questionTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="typeFilter"
                value={type}
                checked={typeFilter === type}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="mr-2 form-radio text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Order Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center text-gray-700">
          <AlignJustify className="mr-2" size={18} />
          Sort Order
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="sortOrder"
              value="default"
              checked={sortOrder === "default"}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mr-2 form-radio text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-600">Default</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mr-2 form-radio text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-600">Ascending</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mr-2 form-radio text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-600">Descending</span>
          </label>
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
              ${view === "grid" 
                ? "bg-orange-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg flex items-center justify-center transition-colors
              ${view === "list" 
                ? "bg-orange-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
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