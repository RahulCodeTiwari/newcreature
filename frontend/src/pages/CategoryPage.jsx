import { useEffect, useState } from "react";
import CategoryCard from "../components/category/CategoryCard";
import { getCategories } from "../api/category.api"; 

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories(); //array milega
      setCategories(categoriesData);
 

    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]); //safety
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mt-10 container mx-auto px-4 ">
      <h1 className="text-2xl font-bold mb-6 bg-sky-100 text-center">All Categories</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
            
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
