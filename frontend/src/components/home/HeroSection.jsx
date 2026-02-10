
import { useEffect, useState } from "react";

const images = [
  "/homepage/homepagebanner-1.png",
  "/homepage/homepagebanner-2.png",
  "/homepage/homepagebanner-3.png",
  "/homepage/homepagebanner-4.png",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (

  <section className="md:mt-10  w-full">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 p-0">

      {/* SLIDER (LEFT) */}
      <div className="relative overflow-hidden leading-none md:col-span-2 h-full">

        {/* TEXT */}
        <div className="absolute inset-0 z-10 flex justify-center items-start text-center pt-4 md:pt-10 pointer-events-none">
          <h1 className="text-black px-2 rounded-lg md:text-2xl font-bold">
            BEST FOOD MACHINERY MANUFACTURER IN INDIA
          </h1>
        </div>

        {/* SLIDER IMAGES */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-6 rounded-full transition ${
                current === i ? "bg-blue-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN (SUPER OFFER + POST REQUIREMENT) */}
      <div className="flex flex-row md:flex-col gap-2 h-full">

        <div className="relative overflow-hidden bg-white shadow-sm flex-1">
          <img
            src="/homepage/offer-bannerleft.png"
            alt="Super Offer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative overflow-hidden bg-blue-900 shadow-sm flex-1">
          <img
            src="/homepage/postrequirement.png"
            alt="Post Requirement"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  </section>

  );
};

export default HeroSection;  