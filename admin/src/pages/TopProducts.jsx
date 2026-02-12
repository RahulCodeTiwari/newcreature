import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/authContext";
import toast from "react-hot-toast";

const TopProducts = () => {
  const { adminToken } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Category fetch error:", err);
      toast.error("Failed to load categories");
    }
  };

    // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async (catId) => {
    if (!catId) {
      setProducts([]);
      setSelectedProducts([]);
      return;
    }

    try {
      const res = await axios.get(`/products?category=${catId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setProducts(res.data.products || []);
      setSelectedProducts([]);
    } catch (err) {
      console.error("Product fetch error:", err);
      toast.error("Failed to load products");
      setProducts([]);
    }
  };

  // ---------------- FETCH TOP PRODUCTS ----------------
  const fetchTopProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/home-top-products", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setTopProducts(res.data.data || []);
    } catch (err) {
      console.error("Top products fetch error:", err);
      toast.error("Failed to load top products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTopProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchProducts(selectedCategory);
    else setProducts([]);
  }, [selectedCategory]);

    // ---------------- ADD PRODUCTS ----------------
  const handleAdd = async () => {
    if (!selectedProducts.length) return toast.error("Select at least one product");

    try {
      const res = await axios.post(
        "/home-top-products",
        { productIds: selectedProducts },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      const newItems = res.data.data || [];

      // merge old + new, skip duplicates
      setTopProducts((prev) => {
        const ids = new Set();
        const merged = [...prev, ...newItems].filter((item) => {
          if (!item.product?._id) return false; // skip null
          if (ids.has(item.product._id)) return false; // skip duplicate
          ids.add(item.product._id);
          return true;
        });
        return merged;
      });

      setSelectedProducts([]);
      toast.success("Added to homepage ✅");
    } catch (err) {
      console.error("Add top product error:", err);
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

    // ---------------- DELETE PRODUCTS ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Remove from homepage?")) return;

    try {
      const res = await axios.delete(`/home-top-products/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (res.data.success) {
        setTopProducts((prev) => prev.filter((item) => item._id !== id));
        toast.success("Removed ✅");
      } else {
        toast.error(res.data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.error("Delete top product error:", err);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Homepage Top Products</h1>

      {/* CATEGORY SELECT */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* PRODUCTS CHECKBOXES */}
      {products.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {products.map((sc) => (
            <label
              key={sc._id}
              className="border p-2 rounded flex gap-2 items-center"
            >
              <input
                type="checkbox"
                value={sc._id}
                checked={selectedProducts.includes(sc._id)}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedProducts((prev) =>
                    prev.includes(id)
                      ? prev.filter((x) => x !== id)
                      : [...prev, id]
                  );
                }}
              />
              {sc.name}
            </label>
          ))}
        </div>
      )}

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Add Selected to Homepage
      </button>

      {/* TOP PRODUCTS LIST */}
      <h2 className="font-semibold mb-2">Homepage Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : topProducts.length === 0 ? (
        <p>No top products added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topProducts.map((item) =>
            item.product ? (
              <div
                key={item._id}
                className="border rounded p-2 flex flex-col items-center"
              >
                <img
                  src={item.product.image || "/placeholder.png"}
                  alt={item.product.name}
                  className="h-32 w-full object-contain mb-2"
                />
                <span>{item.product.name}</span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
                >
                  Remove
                </button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default TopProducts;
