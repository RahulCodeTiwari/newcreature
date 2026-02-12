import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import ProductCard from "../components/category/ProductCard";


const ProductPage = () => {
  const { slug } = useParams();
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await getProducts(slug);
        // 👇 IMPORTANT
        setCategoryImage(res.category?.image?.url || "");
        setCategoryName(res.category?.name || "");
        setProducts(res.products || []);

      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="mt-20 p-2">
      {categoryImage && (
         <div className="flex justify-center mb-2 -mt-17">
          <img
            src={categoryImage}
            className="w-14 max-w-4xl h-14 md:h-24 md:w-28
            object-cover rounded-xl"
          />
        </div>
      )}
    
      {/* CATEGORY NAME TOP */}
      {categoryName && (
        <div className=" flex justify-center uppercase bg-sky-100   text-white mb-6">
          <h1 className="w-40 text-sm rounded-xl font-semibold bg-[rgb(0,52,102)] text-center">{categoryName}</h1>
          
        </div>
      )}

      {/* products */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((pro) => (
            <ProductCard key={pro._id} pro={pro} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductPage;
