import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${slug}`)
      .then((res) => {
        // backend direct object bhej raha hai
        setBlog(res.data || null);
      })
      .catch(console.error);
  }, [slug]);

  if (!blog) {
    return (
      <p className="text-center mt-20 text-lg">
        Loading blog...
      </p>
    );
  }

  return (
   <div className="max-w-4xl mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6">
    {blog.title}
  </h1>

  {/* FEATURED IMAGE */}
  {blog.featuredImage && (
    <img
      src={blog.featuredImage}
      alt={blog.title}
      className="mb-6 w-full rounded"
    />
  )}

  {/* SECTIONS */}
  {blog.sections?.map((section, index) => (
    <div key={index} className="mb-8">
      {/* SECTION HEADING */}
      {section.heading && (
        <h2 className="text-2xl font-semibold mb-3">
          {section.heading}
        </h2>
      )}

      {/* SECTION DESCRIPTION */}
      {section.description && (
        <div
          className="prose max-w-none prose-a:text-orange-500 prose-a:underline"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(section.description),
          }}
        />
      )}
    </div>
  ))}
</div>

  );
};

export default BlogDetail;
