import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/authContext";
import toast from "react-hot-toast";

const TopSubCategories = () => {
  const { adminToken } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [topSubCategories, setTopSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH CATEGORIES ---------------- */
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

  /* ---------------- FETCH SUBCATEGORIES ---------------- */
/* ---------------- FETCH SUBCATEGORIES ---------------- */
const fetchSubCategories = async (catId) => {
  if (!catId) {
    setSubCategories([]);
    setSelectedSubCategories([]);
    return;
  }

  try {
    const res = await axios.get(
      `/subcategories?category=${catId}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    // 👇 backend sends { data: [...] }
   setSubCategories(res.data.subcategories || []);

    setSelectedSubCategories([]);
  } catch (err) {
    console.error("Subcategory fetch error:", err);
    toast.error("Failed to load subcategories");
    setSubCategories([]);
  }
};


  /* ---------------- FETCH TOP SUBCATEGORIES ---------------- */
  const fetchTopSubCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/home-top-subcategories", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setTopSubCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load top subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTopSubCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchSubCategories(selectedCategory);
    else setSubCategories([]);
  }, [selectedCategory]);

  /* ---------------- ADD ---------------- */
  const handleAdd = async () => {
    if (!selectedSubCategories.length) {
      return toast.error("Select at least one subcategory");
    }

    try {
      const res = await axios.post(
        "/home-top-subcategories",
        { subCategoryIds: selectedSubCategories },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      setTopSubCategories((prev) => [...prev, ...res.data.data]);
      setSelectedSubCategories([]);
      toast.success("Added to homepage ✅");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Remove from homepage?")) return;

    try {
      await axios.delete(`/home-top-subcategories/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setTopSubCategories((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Removed ✅");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">
        Homepage Top SubCategories
      </h1>

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

      {/* SUBCATEGORIES */}
      {subCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {subCategories.map((sc) => (
            <label
              key={sc._id}
              className="border p-2 rounded flex gap-2 items-center"
            >
              <input
                type="checkbox"
                value={sc._id}
                checked={selectedSubCategories.includes(sc._id)}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedSubCategories((prev) =>
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

      {/* TOP SUBCATEGORIES LIST */}
      <h2 className="font-semibold mb-2">
        Homepage SubCategories
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : topSubCategories.length === 0 ? (
        <p>No top subcategories added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topSubCategories.map((item) => (
            <div
              key={item._id}
              className="border rounded p-2 flex flex-col items-center"
            >
              <img
                src={item.subCategory?.image || "/placeholder.png"}
                alt={item.subCategory?.name}
                className="h-32 w-full object-contain mb-2"
              />
              <span>{item.subCategory?.name}</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSubCategories;
