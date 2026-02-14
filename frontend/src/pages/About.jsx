import React from 'react'

const About = () => {
  return (
       <section className=" px-4 ">
      <div className="max-w-7xl mx-auto  p-6 md:p-10">

        {/* MAIN WRAPPER */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT COLUMN (TEXTS) */}
          <div className="w-full md:w-1/2 flex flex-col gap-10 order-1">

            {/* TEXT 1 : ABOUT COMPANY */}
            <div>
              <h1 className="text-orange-400 uppercase text-2xl tracking-wide mb-1">
                About
              </h1>
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Company
              </h2>

              <p className="text-gray-700 leading-relaxed text-sm">
                Founded in 2017, Creature Industry has emerged as a leading
                innovator in the field of food processing machinery. With a
                strong foundation in engineering excellence and deep industry
                knowledge, we have designed and manufactured a wide range of
                machinery that meets the evolving needs of the global food
                industry. From initial concept to final assembly, every machine
                is crafted with advanced technology, precision, and compliance
                with international standards.
              </p>

            
            </div>

            {/* TEXT 2 : ACHIEVEMENTS */}
            <div className="order-3 md:order-none">
              <h3 className="text-2xl font-semibold text-orange-400 mb-3">
                Achievements
              </h3>

              <p className="text-gray-700 leading-relaxed text-sm">
                Creature Industry has proudly earned a reputation as a trusted
                leader in the food processing machinery sector through years of
                dedication, innovation, and customer satisfaction. Our machines
                are successfully operating in numerous food manufacturing
                facilities across India and internationally, helping clients
                achieve higher efficiency and consistent product quality.
              </p>

              
            </div>

          </div>

          {/* RIGHT COLUMN (IMAGE) */}
          <div className="w-full md:w-1/2 order-2">
            <img
              src="/homepage/Building-Logo.webp"
              alt="About Company"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
