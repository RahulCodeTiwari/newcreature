import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setSEO } from "../utils/seo";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => {
        setBlogs(Array.isArray(res.data) ? res.data : []);
      })
      .catch(console.error);
  }, []);


  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Blogs: {blogs.length}
      </h1>

      <div className="grid  gap-6">
        {blogs.map((blog) => {
          const firstSection = blog.sections?.[0];

          return (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="border rounded p-4 hover:shadow transition"
            >

                 {/* TITLE */}
              <h2 className="font-bold text-2xl mb-2">
                {blog.title}
              </h2>
              {/* image sirf tab render ho jab ho */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="mb-6 w-full h-auto rounded"
        />
      )}

              {/* FIRST SECTION */}
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
