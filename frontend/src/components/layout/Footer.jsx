
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
 
} from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {Link} from "react-router-dom";


const Footer = () => {
  const [number, setNumber] = useState("");  
  const [formSubmitted, setFormSubmitted] = useState(false);

const handleDownload = () => {

    if (!formSubmitted) {
      alert("Please fill the contact form to download the brochure.");
      return;
    }

    window.open("/Index-all-products.pdf", "_blank");
  };

  return (
    <footer className="bg-[#dfe3e8]  relative mb-16 md:mb-0">

         {/* Stay Connected */}
      <div className="bg-white text-center py-6">
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Stay Connected
        </h3>
          <div className="flex justify-center gap-3">
                <a
                  href="https://www.youtube.com/@CREATUREINDUSTRY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition">
                  <FaYoutube size={18} />
                </a>
                
                <a
                  href="https://www.instagram.com/creatureindustry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full 
                  flex items-center justify-center
                  hover:scale-110 transition"
                >
                  <img
                    src="/assets/ui/icons/instagram-icon.png"
                    alt="Instagram"
                    className="w-10 h-10"
                  />
                </a>

                <a
                  href="https://www.facebook.com/p/Creature-industry-100064449452915/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition">
                 <FaFacebookF size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/company/creature-industry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition">
                  <FaLinkedinIn size={16} />
                </a>

                <a
                  href="tel:+91 9555542745"
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition">
                  <FaWhatsapp size={18} />
                </a>

                <a 
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition">
                  <FaXTwitter size={16} />
                </a>
          
               </div>
             </div>
            {/* ===== Top Input & Button ===== */}
            <div className="w-full bg-[#e1e4e8] px-4 py-2">

              <div className=" mx-auto flex gap-4">
                  {/* Input */}
                <a href="/contact" className="flex-1 text-center py-1 rounded-lg text-xl font-semibold bg-white text-gray-700 outline-none">
                  Contact Us
                </a>

                  <a
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDownload}
                    className="bg-[rgb(255,165,55)] hover:bg-orange-400 transition px-1 rounded-lg text-xl font-semibold flex items-center gap-2"
                  >
                    Download Brochure
                    <ArrowUpRight size={16} />
                  </a>
                  </div>
                </div> 

              {/* ===== Get in Touch ===== */}
              <div className="bg-white mx-4 rounded-xl p-5 mb-4">
                <h2 className="text-2xl font-bold text-center mb-4">
                  Get in touch
                </h2>

                <div className="space-y-3 text-gray-800">
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-700" />
                    <span className="font-semibold text-lg">
                      +91 95555 42745
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-700" />
                    <span>Support@creatureindustry.com</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-700 text-xl mt-1" />
                    <span className="text-sm leading-relaxed">
                      Address - C-24, Landmark- One Up Motor, Near Transport
                      Metro Station, Kanpur Road, Alambagh, Lucknow,
                      Uttar Pradesh, Pincode - 226012
                    </span>
                  </div>
                </div>
              </div>

      {/* ===== Products Range ===== */}
      <div className="px-6 mb-4">    
            <div className="flex flex-col md:flex-row md:justify-between gap-4">

        
             
              <div className="text-center md:text-left md:w-1/3">
                <h3 className="text-sky-900 text-xl font-bold mb-2 ">
                  Our Products Range
                </h3>

                <ul className=" text-sm font-semibold text-left">

                  <li>1- Weighing</li>
                  <li>2- Packing (Liquid & Hard Materials)</li>
                  <li>3- Sealing Pouch & Bottle Sealing</li>
                  <li>4- Printing (Flexible & Hard Materials)</li>
                  <li>5- Oil Expeller, Cold Press, Oil Filter</li>
                  <li>6- Oil / Liquid & Viscous Filling Machines</li>
                  <li>7- Pulverizer & Chakki</li>
                  <li>8- Fast Food, Snacks & Confectionery</li>
                  <li>9- Hotel Kitchen & Bakery</li>
                  <li>10- Peelers & Slicer</li>
                </ul>
              </div>

              <hr className="text-sky-300"/>

              {/* 2nd + 3rd Div */}
              <div className="text-center justify-center grid grid-cols-3 sm:grid-cols-3  md:w-2/3 ">

                <div>
                  <h4 className="text-sky-900 font-bold mb-2">
                    Quick Links
                  </h4>
                      <ul className="space-y-1 text-sm font-semibold leading-relaxed">
                    <li><a href="/" className="hover:text-yellow-400">Home Page</a></li>
                    <li><a href="/categories" className="hover:text-yellow-400">Our Products</a></li>
                    <li><a href="/blog" className="hover:text-yellow-400">Blog</a></li>
                    <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
                    <li><a href="/contact" className="hover:text-yellow-400">Contact Us</a></li>
                  </ul>
                </div>

                <div className="w-px"></div>

                <div>
                  <h4 className="text-sky-900 font-bold mb-2 ">
                    Policies & Queries
                  </h4>
                <ul className="space-y-1 text-sm font-semibold leading-relaxed">
                  <li><a href="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</a></li>
                  <li><a href="/return-policy" className="hover:text-yellow-400">Return Policy</a></li>
                  <li><a href="/terms-and-conditions" className="hover:text-yellow-400">Terms & Conditions</a></li>
                  <li><a href="/delivery-information" className="hover:text-yellow-400">Delivery Information</a></li>
                </ul>
                </div>

              </div>
            </div>
          </div>

          {/* ===== Mobile Bottom Bar ===== */}
        <div className="fixed bottom-0 flex justify-around items-center left-0 w-full h-20 md:hidden z-50 bg-bottom">
          {/* icons */}
          <Link to="/" className="flex flex-col items-center text-xs  mb-2 text-white">
            <img
              src="/assets/ui/icons/footer-home-icon.png"
              alt="Home"
              className="w-12 h-15 "
            />
            HOME
          </Link>

          {/* INQUIRY */}
          <a
            href="https://wa.me/919555542745"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-xs gap-2 mb-7 text-white"
          >
            <img
              src="/assets/ui/icons/footer-inquiery-icon.png"
              alt="Inquiry"
              className="w-14 h-17 "
            />
            INQUIRY
          </a>

            {/* CALL */}
          <a
            href="tel:+919555542745"
            className="call-btn flex flex-col items-center text-xs gap-4 mb-10 text-white"
          >
            <img
              src="/assets/ui/icons/footer-call-icon.png"
              alt="Call"
              className="call-vibrate w-16 h-19"
            />
            CALL
          </a>


            {/* CATEGORY */}
            <Link to="/categories" className="flex flex-col items-center text-xs gap-2 mb-7 text-white">
              <img
                src="/assets/ui/icons/footer-category-icon.png"
                alt="Category"
                className="w-14 h-16 "
              />
              CATEGORY
            </Link>

            {/* BROCHURE */}
            <Link to="/brochure" className="flex flex-col items-center text-xs text-white">
              <img
                src="/assets/ui/icons/footer-product-brochure-icon.png"
                alt="Brochure"
                className="w-12 h-15 -mt-2"
              />
              BROCHURE
            </Link>
          </div>

         {/* Bottom Bar */}
         <div className="hidden left-0 w-full bg-[rgb(0,52,102)] text-center text-white  text-sm  py-2 md:block">
        © 2017 – 2025 creatureindustry.com. All rights reserved.
      </div>

     
    </footer>
  );
};

export default Footer;

  

