import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchSubcategories } from "../api/subCategory.api";

const SearchResultPage = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!query) return;
    searchSubcategories(query).then((res) =>
      setData(res.subcategories || [])
    );
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">
        Results for "{query}"
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item) => (
          <Link
            key={item._id}
            to={`/subcategory/${item.slug}`}
            className="border p-3 rounded hover:shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-32 w-full object-contain"
            />
            <p className="text-center font-semibold mt-2">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
