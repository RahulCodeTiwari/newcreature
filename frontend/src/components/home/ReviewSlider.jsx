import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Star, Play } from "lucide-react";


const testimonialData = [
  {
    id: 1,
    videoUrl: "https://youtu.be/AkLbcoIoGPc",
    thumbnail: "https://img.youtube.com/vi/AkLbcoIoGPc/hqdefault.jpg",
   
  },
  {
    id: 2,
    videoUrl: "https://youtu.be/UfjDlsjLwF4",
    thumbnail: "https://img.youtube.com/vi/UfjDlsjLwF4/hqdefault.jpg",
   
  },
  {
    id: 3,
    videoUrl: "https://youtu.be/AkLbcoIoGPc",
    thumbnail: "https://img.youtube.com/vi/AkLbcoIoGPc/hqdefault.jpg",
   
  },
  
];

const reviews = [

   {
    name: "Abhay Dubey",
    time: "a months ago",
    rating: 5,
    message:
      "Nice company nice service products are to good i like the build quality",
    initial: "A",
  },
{
    name: "Akshay Mahato",
    time: "2 months ago",
    rating: 5,
    message:
      "Oil, spice & snacks pouch packing machines from Creature Industry work seamlessly without jamming.",
    initial: "A",
  },
  {
    name: "Krishnnpal",
    time: "5 month ago",
    rating: 5,
    message:
      "I purchased an oil dryer machine in Erode for my snack factory. It’s very effective and energy-efficient. It really cuts down oil content in the products. ",
    initial: "K",
  },
  {
    name: "Vishnu Asari",
    time: "5 months ago",
    rating: 4,
    message:
      "The hydro dryer machine is very useful in removing excess water from vegetables and snacks. Makes packaging easier and increases product shelf life.",
    initial: "V",
  },
   {
    name: "Soham Patil",
    time: "4 months ago",
    rating: 4,
    message:
      "Best frozen food equipment supplier I’ve come across. Machines are designed for high volume and efficiency. Temperature controls are accurate",
    initial: "S",
  },
   {
    name: "Anurag Ojha",
    time: "a months ago",
    rating: 4,
    message:
      "Nice Company i buy a pulvlizer from the company i am using it last 6 months",
    initial: "A",
  },
   {
    name: "Rakesh Khichar",
    time: "2 months ago",
    rating: 4,
    message:
      "I highly recommend their ACP Cladding Hyderabad service.",
    initial: "R",
  },
   {
    name: "Deepanshu Yadav",
    time: "2 months ago",
    rating: 4,
    message:
      "Their vertical pouch packing machines for powders are great for our bakery flour and spices. Clean and efficient.",
    initial: "D",
  },
];


const ReviewSlider = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [current, setCurrent] = useState(0);


useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % Math.ceil(reviews.length / 2));
  }, 3000); // 3 sec

  return () => clearInterval(interval);
}, [reviews.length]);

  return (
    <section className="px-4 py-2 bg-white">

          <div className="max-w-6xl mx-auto">
            <hr className="mt-8 text-sky-300"/>

            {/* heading */}
            <h2 className="text-xl  text-center mb-2 mt-4 text-black">
              Our Client Reviews
            </h2>

            {/* slider */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
                breakpoints={{
              768: {
                slidesPerView: 2, // 🖥 desktop pe 2–2 slide
              },
            }}
            >
              {testimonialData.map((item) => (
                <SwiperSlide key={item.id}>
                            
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-full max-w-xl relative cursor-pointer"
                  onClick={() =>
                    setActiveVideo(item.videoUrl.split("youtu.be/")[1])
                  }
                >
                  {/* Thumbnail */}
                  <img
                    src={item.thumbnail}
                    alt={`Testimonial ${item.id}`}
                    className="w-full rounded-lg shadow-lg object-cover"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/3 rounded-lg"></div>

                  {/* PLAY BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-8 h-8 ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-700"
            >
              ✕
            </button>
            {/* Responsive Video */}
            <div className="w-full h-0 pb-[56.25%] relative">
              
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}

                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
          </div>
        </div>
      )}

      {/* Testimonials */}
      <h3 className="text-center text-lg font-bold mb-2 mt-6">
        TESTIMONIALS
      </h3>

      <div className="flex justify-center">
        <a
          href="https://www.google.com/maps/place/Creature+Industry+%7C+Best+Pouch+packing+machine+in+india/@26.7785552,80.8864902,17z/data=!4m14!1m7!3m6!1s0x399bff29746673e5:0x663b9ece1714177a!2sCreature+Industry+%7C+Best+Pouch+packing+machine+in+india!8m2!3d26.7785552!4d80.8864902!16s%2Fg%2F11sx__7hfs!3m5!1s0x399bff29746673e5:0x663b9ece1714177a!8m2!3d26.7785552!4d80.8864902!16s%2Fg%2F11sx__7hfs?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center gap-4 mb-4 mt-1 cursor-pointer text-center ">
            <img
  src="/logocreature.png"
  alt="logo"
  className="w-14 h-14 md:w-18 md:h-18 rounded-full border-2 border-blue-600 object-contain"
/>


            <div>
              <p className="text-sm font-semibold">
                Creature Industry | Best Pouch Packing Machine supplier in India
              </p>

              <div className="flex items-center gap-1 text-yellow-400 justify-center">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} />
                <span className="text-gray-600 text-sm ml-2">
                  382 Google reviews
                </span>
                <button className="border-2 text-black px-2">Write a review</button>
              </div>
            </div>
         </div>
       </a>

</div>



<div>
      <a
        href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0LK6IjzfPSCs2YLRSNagwtrRMSkszsjQ3MTMzN041tTKoMDMzTrJMTU41NDc0MTQ3T_QSTC5KTSwpLUpVyMxLKS0uKaoEAACEFh8&q=creature+industry&rlz=1C1GGRV_enIN1191IN1191&oq=&gs_lcrp=EgZjaHJvbWUqDwgBEC4YJxivARjHARjqAjIJCAAQIxgnGOoCMg8IARAuGCcYrwEYxwEY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyDwgFEC4YJxjHARjqAhjRAzIJCAYQIxgnGOoCMg8IBxAuGCcYxwEY6gIY0QMyFwgIEAAYQhhDGLQCGOoCGIAEGIoFGOcGMhcICRAAGEIYQxi0AhjqAhiABBiKBRjnBjIXCAoQABhCGEMYtAIY6gIYgAQYigUY5wYyFwgLEAAYQhhDGLQCGOoCGIAEGIoFGOcG0gEJMjc1N2owajE1qAIMsAIB8QX8hSv29OlhZg&sourceid=chrome&ie=UTF-8#lrd=0x399bff29746673e5:0x663b9ece1714177a,1,,,,"
        rel="noopener noreferrer"
        className="block"
      >
          
      <div className="relative overflow-hidden  max-w-5xl mx-auto">
      <div
        className="flex transition-transform duration-700"
        style={{
  transform: `translateX(-${current * 100}%)`,
}}

      >
        {reviews.map((review, index) => (
          <div key={index} className="w-full md:w-1/2 px-2 flex-shrink-0 flex justify-center">
            <div className=" rounded-lg p-4   hover:shadow-md transition bg-sky-50">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {review.initial}
                </div>
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.time}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 text-yellow-400 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              {/* Message */}
              <p className="text-sm text-gray-700">{review.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      </a>
      </div>

    </section>
  );
};

export default ReviewSlider;
