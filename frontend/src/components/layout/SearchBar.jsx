import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../api/product.api";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchProducts(query);
        setResults(res.products || []);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (slug) => {
    setQuery("");
    setResults([]);
    navigate(`/product/${slug}`);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
         className="h-10 w-50 md:w-100 bg-white rounded-full  pl-4 pr-10 text-sm outline-none"
      />
       <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            /> 

      {/* 🔽 Suggestions */}
      {query && results.length > 0 && (
        <div className="absolute z-50 bg-white w-full mt-1 border rounded-md shadow-lg">
          {results.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelect(item.slug)}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.groupName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="absolute bg-white w-full mt-1 border rounded-md p-3 text-sm text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
