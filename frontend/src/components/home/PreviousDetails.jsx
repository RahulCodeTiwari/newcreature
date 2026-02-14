import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";


const stats = [
  {  label: "Total Selling Products", icon: "🛒", value: 2000 },
  {  label: "Export Country", icon: "🌍", value: 20 },
  {  label: "Trade Stores", icon: "🏠", value: 100 },
  {  label: "Satisfied Customers", icon: "🏆", value: 20000 },
];

const PreviousDetails = () => {
   const sectionRef = useRef(null);
   const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); //  for one time
        }
      },
      { threshold: 0.4 } // 40% section visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white px-4 mt-4 ">
        <div
            ref={sectionRef}
            className=" grid grid-cols-2 md:grid-cols-4 gap-4"
           >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[rgb(0,52,102)] text-white rounded-xl py-6
                flex-1 flex flex-col items-center justify-center shadow-md"
              >
                <div className="text-2xl">{stat.icon}</div>

                <p className="text-xl font-bold">
                  {startCount ? (
                    <CountUp start={0} end={stat.value} duration={2} suffix="+" />
                  ) : (
                    "0+"
                  )}
                </p>

                <p className="text-sm text-sky-200">{stat.label}</p>
              </div>
            ))}
       </div>
    </section>
    

          

  );
};

export default PreviousDetails;
