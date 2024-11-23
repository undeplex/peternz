import React, { useState } from 'react';

const Filters = ({ sortOrder, setSortOrder, resetFilters }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filters = [
    { label: 'Most Recent', value: 'mostRecent' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Most Viewed', value: 'mostViewed' },
    { label: 'Least Viewed', value: 'leastViewed' },
  ];

  return (
    <>
      {/* Filters for larger screens */}
      <div className="hidden sm:flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSortOrder(filter.value)}
              className={`font-bold text-blue-500 hover:underline transition ${
                sortOrder === filter.value ? 'underline' : ''
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Filters for mobile screens */}
      <div className="sm:hidden mb-6">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Open Filters
        </button>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Sort Blogs</h2>
              <div className="flex flex-col space-y-4">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setSortOrder(filter.value);
                      setIsMobileFilterOpen(false); // Close modal
                    }}
                    className={`font-bold text-blue-500 ${
                      sortOrder === filter.value ? 'underline' : ''
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false); // Close modal
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;