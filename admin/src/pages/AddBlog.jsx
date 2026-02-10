
import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/authContext";
import toast from "react-hot-toast";
import RichTextEditor from "../components/RichTextEditor";
import { useEffect } from "react";

const AddBlog = () => {
  const { adminToken } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const handleEdit = (blog) => {
    setEditingBlogId(blog._id);
    setTitle(blog.title);
    setSections(blog.sections);
    setImage(null);
  };


  const [sections, setSections] = useState([
    { heading: "", description: "" },
  ]);

  // Add new Section
  const addSection = () => {
    setSections([...sections, {heading: "", description: "" }]);
  };

  // Remove Section
  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  // Update Section
  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  }

  const submitBlog = async () => {
    if (!title.trim()) {
      return toast.error("Blog title is required");
    }

      if (
      sections.some(
        (s) => !s.heading.trim() || !s.description.trim()
      )
    ) {
      return toast.error("All headings and descriptions are required");
    }

   

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("sections", JSON.stringify(sections));

      if (image) {
      formData.append("featuredImage", image);
    }

    // Add vs update
    if (editingBlogId) {
      await axios.put(
        `/blogs/${editingBlogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      toast.success("Blog updated successfully ✅");
    } else {
      if(!image) {
        return toast.error("Blog image is required");
      }

    
      await axios.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      toast.success("Blog added successfully ✅");
    }

      // RESET
      setTitle("");
      setSections([{ heading: "", description: "" }]);
      setImage(null);
      setEditingBlogId(null);

      fetchBlogs();
    } catch (err) {
      console.error(
        "Add blog error:",
        err.response?.data || err.message
      );
      toast.error(
        err.response?.data?.message || "Blog add failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };


   const deleteBlog = async (id) => {
      if(!window.confirm("Are you sure you want to delete this blog?")) return;

      try {
        setLoading(true);

        await axios.delete(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        toast.success("Blog deleted successfully ");

        // refresh after delete
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } catch (err) {
        toast.error("Failed to delete blog");
      } finally {
        setLoading(false);
      }
    };

  const fetchBlogs = async () => {
  try {
    const res = await axios.get("/blogs", {
      headers: {
        Authorization: `Bearer ${adminToken}`, // agar protect laga hai
      },
    });

    setBlogs(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchBlogs();
}, []);



  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold mb-4">Add Blog</h1>

      {/* Blog Title */}
      <input
        placeholder="Blog Title"
        className="border p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="border rounded p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Section {index+1} </h2>

            {sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="text-red-500 text-sm"
                >
                  Remove
                </button>
            )}
          </div>

          {/* Heading */}
          <input 
            placeholder="Section Heading"
            className="border p-2 w-full mb-2"
            value={section.heading}
            onChange={(e) => 
              updateSection(index, "heading", e.target.value)
            }
          
          />

          {/* Description */}
          <RichTextEditor
            value={section.description}
            onChange={(value) => 
              updateSection(index, "description", value)
            }
          />

        </div>
      ))}

      {/* Add Section */}
      <button
        type="button"
        onClick={addSection}
        className="border px-3 py-1 rounded mb-4"
      >
        + Add Section
      </button>

          {/* IMAGE */}
      <input
        type="file"
        name="featuredImage"
        accept="image/*"
        className="mt-3 block"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* SUBMIT */}
      <button
        disabled={loading}
        onClick={submitBlog}
        className="bg-black text-white px-4 py-2 mt-4 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </button>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    {blogs.map((blog) => (
      <div key={blog._id} className=" border p-3 rounded mb-3">
        <h3 className="font-semibold">{blog.title}</h3>

         {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="mb-6   rounded"
        />
      )}

        <div className="flex gap-3 mt-2">
      <button
        onClick={() => handleEdit(blog)}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Update
      </button>

      <button
        onClick={() => deleteBlog(blog._id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>

  </div>
 
))}
</div>

  
</div>
  );
};

export default AddBlog;
