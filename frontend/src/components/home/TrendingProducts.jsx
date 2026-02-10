import { useEffect, useState } from "react";
import axios from "../../api/axios";
import ProductSlider from "./ProductSlider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const chunk = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

const TrendingProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch homepage top SUBCATEGORIES
  useEffect(() => {
    const fetchTopSubCategories = async () => {
      try {
        const res = await axios.get("/home-top-subcategories");

        // 🔥 extract actual subcategories
        const mappedItems =
          res.data?.data
            ?.filter(item => item.subCategory)
            ?.map(item => ({
              ...item.subCategory,
              topId: item._id,
            })) || [];

        setItems(mappedItems);
      } catch (err) {
        console.error("Failed to fetch homepage top subcategories:", err);
        toast.error("Failed to load top categories");
      } finally {
        setLoading(false);
      }
    };

    fetchTopSubCategories();
  }, []);

  // max 3 rows, 8 items per row
  const rows = chunk(items, 8).slice(0, 3);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!items.length)
    return <p className="text-center py-10">No top products found</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-semibold mb-8">
        Top Trending Products
      </h2>

      <div className="space-y-4">
        {rows.map((row, index) => (
          <ProductSlider
            key={index}
            products={row}
            onProductClick={(subCategory) =>
              navigate(`/subcategory/${subCategory.slug || subCategory._id}`)
            }
          />
        ))}
      </div>

    </section>
  );
};

export default TrendingProducts;
