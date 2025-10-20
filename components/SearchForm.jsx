// import { useState } from "react";
// import { useRouter } from "next/router";
// import { Search } from "lucide-react";

// export default function SearchForm() {
//   const [query, setQuery] = useState("");
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const router = useRouter();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     router.push(`/search?query=${encodeURIComponent(query)}`);
//   };

//   return (
//     <div>
//       {/* Desktop Search Form */}
//       <form
//         className="hidden  lg:flex items-center "
//         onSubmit={handleSearch}
//       >
//         <input
//           type="text"
//           className="flex-grow border-none bg-transparent border-b-2 rounded-md px-4 py-2"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           type="submit"
//           className=""
//         >
//           <Search/>
//         </button>
//       </form>

//       {/* Mobile Search Button */}
//       <div className="block lg:hidden">
//         <button
//           onClick={() => setShowMobileSearch(true)}
//           className=" dark:invert"
//         >
//           <img src="/search2.png" className="w-"/>
//           </button>

//         {showMobileSearch && (
//           <div className="fixed inset-0 transition-all duration-150 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-white rounded-lg p-4 w-11/12">
//               <form onSubmit={handleSearch}>
//                 <input
//                   type="text"
//                   className="w-full border rounded-md px-4 py-2 mb-4"
//                   placeholder="Search..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white rounded-md px-4 py-2"
//                 >
//                   Search
//                 </button>
//               </form>
//               <button
//                 onClick={() => setShowMobileSearch(false)}
//                 className="w-full mt-2 text-red-500"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Search, X } from "lucide-react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const router = useRouter();
  const mobileInputRef = useRef(null);

  useEffect(() => {
    if (showMobileSearch && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setShowMobileSearch(false);
    }
  };

  const handleMobileClose = () => {
    setShowMobileSearch(false);
    setQuery("");
  };

  return (
    <div className="relative">
      {/* Desktop Search Form */}
      <form
        className="hidden lg:flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-full px-4 py-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-gray-300 dark:focus-within:ring-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        onSubmit={handleSearch}
      >
        <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <input
          type="text"
          className="flex-grow bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm w-48"
          placeholder="Search products, articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </form>

      {/* Mobile Search Button */}
      <div className="block lg:hidden">
        <button
          onClick={() => setShowMobileSearch(true)}
          className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 animate-fade-in">
            <div className="flex items-start justify-center pt-20 px-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-xl animate-slide-down">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    ref={mobileInputRef}
                    type="text"
                    className="flex-grow bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-base"
                    placeholder="What are you looking for?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        handleMobileClose();
                      }
                    }}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2 p-4">
                  <button
                    onClick={handleMobileClose}
                    className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={!query.trim()}
                    className="flex-1 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}