import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/authContext";
import toast from "react-hot-toast";

const Categories = () => {
  const { adminToken } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= EDIT ================= */
  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description || "");
    setPreview(category.image?.url || "");
    setImage(null);
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmitCategory = async () => {
    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    // ADD requires image
    if (!editingId && !image) {
      return toast.error("Category image is required");
    }

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      if (description) formData.append("description", description.trim());
      if (image) formData.append("image", image);

      let res;

      if (editingId) {
        // UPDATE
        res = await axios.put(`/categories/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        setCategories((prev) =>
          prev.map((c) =>
            c._id === editingId ? res.data.category : c
          )
        );

        toast.success("Category updated successfully ✅");
      } else {
        // ADD
        res = await axios.post("/categories", formData, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        setCategories((prev) => [
          res.data.category,
          ...prev,
        ]);

        toast.success("Category added successfully ✅");
      }

      // RESET
      setName("");
      setDescription("");
      setImage(null);
      setPreview("");
      setEditingId(null);
    } catch (err) {
      console.error(
        "Category submit error:",
        err.response?.data || err.message
      );
      toast.error(
        err.response?.data?.message || "Category save failed ❌"
      );
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setCategories((prev) =>
        prev.filter((c) => c._id !== id)
      );

      toast.success("Category deleted");
    } catch (err) {
      console.error("Delete category error:", err);
      toast.error("Delete failed ❌");
    }
  };

  /* ================= CLEAN PREVIEW ================= */
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Categories</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Category name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            rows={3}
            placeholder="Short description (max 300 characters)"
            className="border p-2 rounded md:col-span-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          <button
            onClick={handleSubmitCategory}
            className={`${
              editingId ? "bg-green-600" : "bg-blue-600"
            } text-white px-4 py-2 rounded hover:opacity-90`}
          >
            {editingId ? "Update Category" : "Add Category"}
          </button>
        </div>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-4 w-32 h-32 object-cover rounded border"
          />
        )}
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="border rounded shadow bg-white"
            >
              <img
                src={cat.image?.url || "/placeholder.png"}
                alt={cat.name}
                className="h-40 w-40 object-cover rounded-t"
              />

              <div className="p-4">
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-gray-600">
                  {cat.description}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
