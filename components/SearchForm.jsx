import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Desktop Search Form */}
      <form
        className="hidden  lg:flex items-center "
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="flex-grow border-none bg-transparent border-b-2 rounded-md px-4 py-2"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className=""
        >
          <Search/>
        </button>
      </form>

      {/* Mobile Search Button */}
      <div className="block lg:hidden">
        <button
          onClick={() => setShowMobileSearch(true)}
          className="dark:text-gray-100"
        >
          <Search/>
          </button>

        {showMobileSearch && (
          <div className="fixed inset-0 transition-all duration-150 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 w-11/12">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 mb-4"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Search
                </button>
              </form>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="w-full mt-2 text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}