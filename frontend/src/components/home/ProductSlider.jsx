import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductSlider = ({
  products = [],
  onProductClick,
  onInquiry,
  onViewMore,
}) => {
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(
    window.innerWidth >= 1024 ? 4 : 2
  );

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 4 : 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.ceil(products.length / itemsPerView) - 1;

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const translateX = `-${current * 100}%`;

  if (!products || products.length === 0) return null;

  return (
    <div className="relative">
      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(${translateX})` }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className={`grid gap-6 min-w-full ${
                itemsPerView === 4 ? "grid-cols-4" : "grid-cols-2"
              }`}
            >
              {products
                .slice(
                  pageIndex * itemsPerView,
                  pageIndex * itemsPerView + itemsPerView
                )
                .map((item) => (
                  <ProductCard
                    key={item._id || item.id}
                    product={item}
                    onProductClick={onProductClick}
                    onInquiry={onInquiry}
                    onViewMore={onViewMore}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {maxIndex > 0 && (
        <>
          <button
            onClick={() =>
              setCurrent(current === 0 ? maxIndex : current - 1)
            }
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 border p-1 bg-white rounded-full shadow"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() =>
              setCurrent(current === maxIndex ? 0 : current + 1)
            }
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 border p-1 bg-white rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                i === current ? "bg-blue-700" : "bg-blue-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
