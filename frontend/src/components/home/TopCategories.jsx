import React from "react";
import CategoryCards from "./CategoryCards";
import { useNavigate } from "react-router-dom";

const TopCategories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Rice Mill",
      image: "/homepage/category-icons/pulverizer-grinder-atta-chakki-rice-mill.png",
    },
    {
      title: "Bakery",
      image: "/homepage/category-icons/bakery-kitchen.png",
    },
    {
      title: "Pulverizer",
      image: "/homepage/category-icons/pulverizer-grinder-atta-chakki-rice-mill.png",
    },
    {
      title: "coffee snacks & fastfood",
      image: "/homepage/category-icons/coffee-snacks-fastfood-confectionary.png",
    },
     {
      title: "de-hydrator fryer steamer",
      image: "/homepage/category-icons/de-hydrator-fryer-steamer.png",
    },
     {
      title: "labelling printing",
      image: "/homepage/category-icons/labeling-printing.png",
    },
     {
      title: "liquid powder filling",
      image: "/homepage/category-icons/liquid-powder-filling.png",
    },
     {
      title: "mixer handa roaster",
      image: "/homepage/category-icons/mixer-handa-roaster.png",
    },
     {
      title: "peeler washer cuter slicer",
      image: "/homepage/category-icons/peeler-washer-cutter-slicer.png",
    },
   
  ];

  const handleWheel = (e) => {
  if (window.innerWidth < 768) return; // tablet/mobile untouched

  e.preventDefault();
  sliderRef.current.scrollLeft += e.deltaY;
};


  return (
    <section >
      {/* Heading */}
      <section>
  {/* Heading */}
  <h2 className="text-center text-2xl font-semibold mb-2">
    Top Categories
  </h2>

  {/* Cards */}
  <div
    className="
      max-w-6xl mx-auto px-4
      grid grid-cols-3 gap-2
      md:flex md:gap-4 md:overflow-x-auto md:no-scrollbar
    "
  >
    {categories.map((cat, index) => (
      <div key={index} className="md:min-w-[220px]">
        <CategoryCards
          title={cat.title}
          image={cat.image}
        />
      </div>
    ))}
  </div>
</section>


       {/* View All Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/categories`)}
            className="border-2 border-gray-300 px-8 py-2 rounded-lg text-blue-700 font-semibold cursor-pointer hover:bg-gray-100"
          >
            VIEW ALL
          </button>
        </div>
    </section>
  );
};

export default TopCategories;
