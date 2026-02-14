import { useEffect, useState } from "react";
import api from "../api/axios";  // correct path lagao
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  api
    .get("/blog")
    .then((res) => {
      setBlogs(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => {
      console.error("Blog fetch error:", err);
    });
}, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Blogs: {blogs.length}
      </h1>

      <div className="grid gap-6">
        {blogs.map((blog) => {
          const firstSection = blog.sections?.[0];

          return (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="border rounded p-4 hover:shadow transition"
            >
              <h2 className="font-bold text-2xl mb-2">
                {blog.title}
              </h2>

              {blog.featuredImage && (
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="mb-6 w-full h-auto rounded"
                />
              )}

              {firstSection?.description && (
                <div
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: firstSection.description,
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
