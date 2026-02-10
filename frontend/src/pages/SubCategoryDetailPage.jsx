
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRelatedSubcategories, getSingleSubCategory } from "../api/subCategory.api";
import ReviewSlider from "../components/home/ReviewSlider";
import InquirySection from "../components/home/InquirySection";
import PreviousDetails from "../components/home/previousDetails";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";


/* 🔹 YOUTUBE HELPER */
const getYouTubeVideoId = (url) => {
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
};


const SubCategoryDetailPage = () => {
  const { slug } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [relatedSubcategories, setRelatedSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllBlocks, setShowAllBlocks] = useState(false);

const slides = [
  ...(subcategory?.slider?.images || []),
  ...(subcategory?.slider?.youtube?.link ? ["YOUTUBE"] : []),
];



  /* 🔹 YOUTUBE THUMBNAIL AUTO GENERATE */
  const videoId = getYouTubeVideoId(subcategory?.slider?.youtube?.link);
  const youtubeThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => 
      prev === slides.length - 1 ? 0 : prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

    /* 🔹 FETCH SUBCATEGORY */
  useEffect(() => {
    setLoading(true);
    getSingleSubCategory(slug)
      .then((res) => {
     
        setSubcategory(res.subcategory || null);
        
      })
      .finally(() => setLoading(false));
  }, [slug]);


  
  /* 🔹 FETCH RELATED */
useEffect(() => {
  if (!subcategory) return;

  getRelatedSubcategories({
    groupName: subcategory.groupName,
    categoryId: subcategory.category,
    currentId: subcategory._id,
  })
    .then((res) => {
    
      setRelatedSubcategories(res.subcategories || []);
    })
    .catch((err) => console.error(err));
}, [subcategory]);


  if (loading) return <p className="p-4">Loading...</p>;
  if (!subcategory) return <p className="p-4">Subcategory not found</p>;


  return (
    <div className="w-full mx-auto px-4 ">
      <h1 className="text-xl font-bold  uppercase ml-10">
            {subcategory.name}
      </h1>
        <button className="text-[rgb(0,52,102)] font-semibold ml-10">Get latest price</button>
              {/* 🔹 TOP SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


          {/* LEFT SIDE — SLIDER */}
          <div className="relative overflow-hidden">

            {/* SLIDES TRACK */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 80}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="flex-shrink-0 w-[80%] ">

                  {/* IMAGE SLIDE */}
                  {slide !== "YOUTUBE" && (
                    <img
                      src={slide}
                      className={`ml-9 md:ml-10 lg:ml-22 w-full h-full object-contain rounded bg-white ${
                        index === activeIndex ? "scale-100" : "scale-90 opacity-80"
                      } transition-all duration-500`}
                    />
                  )}

            {/* YOUTUBE SLIDE */}
           
{/* 
            {slide === "YOUTUBE" && (
  <a
    href={subcategory.slider.youtube.link}
    target="_blank"
    rel="noopener noreferrer"
    className="ml-12 lg:ml-24 w-full h-full relative cursor-pointer rounded overflow-hidden block"
  >
    <img
      src={subcategory.slider.youtube.thumbnail}
      className="w-full h-full object-cover"
      alt="YouTube Video"
    />

 
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </a>
)} */}


  {slide === "YOUTUBE" && videoId && (
                  <a
                    href={subcategory?.slider?.youtube?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-12 lg:ml-24 w-full h-full relative block rounded overflow-hidden cursor-pointer"
                  >
                    <img
                      src={youtubeThumbnail}
                      alt="YouTube Video"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                )}

          </div>
      ))}
    </div>

        {/* DOTS BELOW SLIDER */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              
            />
            
          ))}
  {videoId && (
  <img
    src="/assets/icons/video-solid.svg"
    alt="Video"
    className="-mt-2 h-6"
  />
)}

        
        </div>
       

    </div>

       

        {/* BASIC INFO */}
        <div>
          {/* PRICE */}
          {subcategory.priceRange?.min && subcategory.priceRange?.max ? (
            <p className="text-xl text-[rgb(0,52,102)] font-semibold mb-2">
              ₹ {subcategory.priceRange.min} – ₹ {subcategory.priceRange.max}
            </p>
          ) : (
            <p className="text-gray-500 mb-4">Price not available</p>
          )}

          {/* Specifications */}
             {subcategory.specifications && (
                <>
                  <div className="bg-[rgb(0,52,102)] text-white text-center font-semibold px-4 py-1 md:py-2 p-2 shadow-sm">
                      PRODUCT SPECIFICATION
                  </div>
                <table className="w-full text-sm shadow-xl border-collapse">
                  <tbody>
                    {Object.entries(subcategory.specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className="px-1 py-1 font-medium whitespace-nowrap">
                          {key}
                        </td>
                        <td className="px-1 py-1">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </>
            )}

                {/* BUTTONS */}
      <div className="mt-4 flex  sm:flex-row gap-3">
        
        {subcategory.callNumber && (
          <a
            href={`tel:${subcategory.callNumber}`}
            className="flex-1 flex items-center justify-center gap-2
            bg-[rgb(0,52,102)] text-white py-2
            rounded-lg text-sm md:text-base md:py-3
            hover:opacity-90 transition"
          >
            <img
              src="../assets/icons/callnow.png"
              alt="Call"
              className="w-4 h-5"
            />
            Call Now
          </a>
        )}

        {subcategory.whatsappNumber && (
          <a
            href={`https://wa.me/${subcategory.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2
            bg-green-600 text-white py-2
            rounded-lg text-sm md:text-base
            hover:bg-green-700 transition"
          >
            <img
              src="../assets/icons/whatsapp.png"
              alt="WhatsApp"
              className="w-5 h-5"
            />
            WhatsApp
          </a>
        )}

        {subcategory.brochureUrl && (
          <a
            href={subcategory.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2
            bg-[rgb(0,52,102)] text-white py-2
            rounded-lg text-sm md:text-base
            hover:opacity-90 transition"
          >
            <img
              src="../assets/icons/dounloadbrochure.png"
              alt="Brochure"
              className="w-5 h-5"
            />
            Brochure
          </a>
        )}

      </div>
      </div>
      </div>

      <div className="flex justify-center bg-blue-100 py-2 text-black mt-4  gap-2">
        <h1 className="w-40 text-sm rounded-2xl font-semibold bg-white py-1 text-center">
          Product Description
        </h1>
        <button className="border-2 px-2 bg-white font-semibold">Write a review</button>
      </div>

      {/* Description blocks */}
        {subcategory.description?.map((block, i) => {
          if(!showAllBlocks && i > 0) return null;

          return (
            <div key={block._id} className="mt-4">
              <h3 className="font-semibold text-lg">
                {block.heading}
              </h3>

              <div className="richtext text-gray-700 leading-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(block.text),
              }}
              />
            </div>
          );
        })}

        {/* View More / View less */}
        {subcategory.description?.length > 1 && !showAllBlocks && (
          <button
            onClick={() => setShowAllBlocks(true)}
            className=" text-blue-600 text-sm font-semibold mmt-2 mb-2 ml-auto block"
          >
            View More
          </button>
        )}

        {showAllBlocks && (
          <button
            onClick={() => setShowAllBlocks(false)}
            className=" text-blue-600 text-sm font-semibold mt-2 mb-2 ml-auto block"
          >
            View Less
          </button>
        )}


      {/* 🔹 BLUE SECTION */}
 {subcategory.blueSection?.heading ||
subcategory.blueSection?.images?.length > 0 ? (
  <div className="rounded">
    {subcategory.blueSection.heading && (
      <h2 className="text-xl font-bold text-center bg-[rgb(0,52,102)] text-white mb-2">
        {subcategory.blueSection.heading}
      </h2>
    )}

    {subcategory.blueSection.images?.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subcategory.blueSection.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`rounded shadow-sm w-full ${
              i === 0 ? "md:col-span-2" : ""
            }`}
          />
        ))}
      </div>
    )}
  </div>
) : null}


      <h3 className="text-xl  text-center bg-[rgb(0,52,102)] text-white py-1">Related Products</h3>
{/* 🔹 RELATED SUBCATEGORIES */}
 {subcategory && relatedSubcategories.length > 0 && (
  <div className="mt-8 px-4">
    <h3 className="text-xl font-semibold text-center mb-4 uppercase">
      {subcategory.groupName}
    </h3>

    {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {relatedSubcategories.map((item) => (
        <Link
          key={item._id}
          to={`/subcategory/${item.slug}`}
          className="border rounded-lg p-3 hover:shadow-md"
        >
          <img
            src={item.image || "/assets/no-image.png"}
            alt={item.name}
            className="w-full h-32 object-contain mb-2"
          />
          <p className="text-sm font-semibold text-center">
            {item.name}
          </p>
        </Link>
      ))}
    </div> */}

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {relatedSubcategories.map((item) => (
    <Link
      key={item._id}
      to={`/subcategory/${item.slug}`}
      className="group bg-[#f4f9fc] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      {/* IMAGE */}
      <div className="h-48 flex items-center justify-center ">
        <img
          src={item.image || "/assets/no-image.png"}
          alt={item.name}
          className="max-h-full object-contain transition-transform group-hover:scale-105"
        />
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#0b3a66] text-white flex items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold leading-tight">
          {item.name}
        </p>
   
          <span>View More</span>
       
      </div>
    </Link>
  ))}
</div>

  </div>
)}

       <ReviewSlider />     
       <InquirySection />
       <PreviousDetails />
    </div>
  );
};

export default SubCategoryDetailPage;


