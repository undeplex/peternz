// import React, { useState } from 'react';

// const Filters = ({ sortOrder, setSortOrder, resetFilters }) => {
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   const filters = [
//     { label: 'Most Recent', value: 'mostRecent' },
//     { label: 'Oldest', value: 'oldest' },
//     { label: 'Most Viewed', value: 'mostViewed' },
//     { label: 'Least Viewed', value: 'leastViewed' },
//   ];

//   return (
//     <>
//       {/* Filters for larger screens */}
//       <div className="hidden sm:flex justify-between items-center mb-6">
//         <div className="flex space-x-4">
//           {filters.map((filter) => (
//             <button
//               key={filter.value}
//               onClick={() => setSortOrder(filter.value)}
//               className={`font-bold text-blue-500 hover:underline transition ${
//                 sortOrder === filter.value ? 'underline' : ''
//               }`}
//             >
//               {filter.label}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={resetFilters}
//           className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Filters for mobile screens */}
//       <div className="sm:hidden mb-6">
//         <button
//           onClick={() => setIsMobileFilterOpen(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Open Filters
//         </button>
//         {isMobileFilterOpen && (
//           <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
//               <h2 className="text-lg font-bold mb-4">Sort Blogs</h2>
//               <div className="flex flex-col space-y-4">
//                 {filters.map((filter) => (
//                   <button
//                     key={filter.value}
//                     onClick={() => {
//                       setSortOrder(filter.value);
//                       setIsMobileFilterOpen(false); // Close modal
//                     }}
//                     className={`font-bold text-blue-500 ${
//                       sortOrder === filter.value ? 'underline' : ''
//                     }`}
//                   >
//                     {filter.label}
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-6 flex justify-between">
//                 <button
//                   onClick={() => setIsMobileFilterOpen(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => {
//                     resetFilters();
//                     setIsMobileFilterOpen(false); // Close modal
//                   }}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Filters;
import React, { useState, useEffect } from 'react';

const Filters = ({ sortOrder, setSortOrder, resetFilters }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const filters = [
    { label: 'Plus récents', value: 'mostRecent' },
    { label: 'Plus anciens', value: 'oldest' },
    { label: 'Plus vus', value: 'mostViewed' },
    { label: 'Moins vus', value: 'leastViewed' },
  ];

  useEffect(() => {
    if (isMobileFilterOpen) {
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }
  }, [isMobileFilterOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsMobileFilterOpen(false), 300);
  };

  const handleFilterSelect = (value) => {
    setSortOrder(value);
    handleClose();
  };

  const handleReset = () => {
    resetFilters();
    handleClose();
  };

  return (
    <>
      {/* Filters for larger screens */}
      <div className="hidden sm:flex flex-wrap gap-3 items-center mb-8">
        <span className="text-sm font-medium text-gray-500 mr-2">Trier par :</span>
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSortOrder(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              sortOrder === filter.value
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            {filter.label}
          </button>
        ))}
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          Réinitialiser
        </button>
      </div>

      {/* Filters for mobile screens */}
      <div className="sm:hidden mb-6">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-700 font-medium flex items-center justify-between shadow-sm hover:bg-gray-50 transition-all duration-200"
        >
          <span>Trier les articles</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop with blur effect */}
            <div 
              className={`absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 ${
                isAnimating ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={handleClose}
            />
            
            {/* Slide-up panel */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl transform transition-transform duration-300 ${
                isAnimating ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Trier les articles</h2>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Filter options */}
              <div className="px-6 py-4 space-y-3">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterSelect(filter.value)}
                    className={`w-full px-4 py-3 rounded-full text-left font-medium transition-all duration-200 border ${
                      sortOrder === filter.value
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Reset button */}
              <div className="px-6 py-4 border-t border-gray-100">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 text-gray-700 font-medium border border-transparent hover:bg-gray-200 transition-all duration-200"
                >
                  Réinitialiser les filtres
                </button>
              </div>

              {/* Safe area for mobile devices */}
              <div className="pb-6"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;