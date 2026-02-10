import { useState } from "react";

const ContactForm = ({
  title = "Get in Touch",
  buttonText = "Submit",
  onSubmit,
 

}) => {


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmitComplaint = () => {
  const selected = document.querySelector(
    'input[type="radio"]:checked'
  );

  if (!selected) {
    alert("Please select a complaint");
    return;
  }

  // show success message
  setShowSuccess(true);

  // reset radio buttons
  document
    .querySelectorAll('input[type="radio"]')
    .forEach((radio) => (radio.checked = false));

  // auto hide message (optional)
  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
};



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
     if (onSubmit) {
       onSubmit(formData); // parent ko data bhejega
    }

  // basic validation (phone required)
  if (!formData.phone) {
    alert("Please enter your phone number");
    return;
  }

  //  yahan PDF open hoga
  window.open("/index-all-products.pdf", "_blank");

    // reset
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className=" py-6 px-4 bg-white">

      <div className="max-w-7xl mx-auto  flex-col md:flex-row gap-10">
          {/* LEFT : YOUR EXISTING FORM */}
          <div className=" md:w-full order-1">
            <div className="flex flex-col md:flex-row  gap-4  ">
              <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    {title}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4 ">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />

                                
                      <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => {
                        // only numbers allow
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, phone: value });
                      }}
                      required
                      minLength={10}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                      className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address (optional)"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                      />

                      <textarea
                        name="message"
                        placeholder="Your Message (optional)"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                      />


                      <button
                        type="submit"
                        className="w-full bg-sky-800 text-white py-4 rounded-lg text-sm font-semibold hover:bg-sky-700 transition"
                      >
                        submit
                      </button>
                    </form> 
                  </div>

                    
    
  
                {/* Text Box */}
                <div className="w-full md:w-1/2 order-2 space-y-8">

                  <div className="bg-gray-50 border rounded-xl p-6 space-y-2">
                    <h3 className="text-2xl font-bold">
                      Get In Touch
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our support team is always ready to help you. Feel free to contact us
                      for any product enquiry, service support, or general questions.
                    </p>

                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-3">
                        <span className="text-red-600">📞</span>
                        +91 9555542745
                      </li>

                      <li className="flex items-center gap-3">
                        <span className="text-red-600">✉️</span>
                        support@creatureindustry.com
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="text-red-600">📍</span>
                        <span>
                          C-24, One Up Motor, Near Transport Metro Station,
                          Kanpur Road, Alambagh, Lucknow – 226012
                        </span>
                      </li>
                      </ul>
                    </div>
              
                  </div>
                </div>
                
                </div>
                
                    
                <div className="max-w-7xl mx-auto mt-6">
                  {/* Heading */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      Submit a Complaint
                    </h2>
                    <p className="text-gray-600 text-sm">
                      To get the help and support, please tell us which type of your complaint is:
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* LEFT : Complaint Form */}
                    <div className="w-full md:w-2/3 bg-green-50 border border-green-200 p-6 rounded-md order-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Trade Dispute */}
                        <div>
                          <h3 className="font-semibold mb-4">
                            Report a Trade Dispute
                          </h3>

                          <ul className="space-y-2 text-sm">
                            <li><label className="flex items-center gap-2"><input type="radio" name="trade" /> Products not received after payment</label></li>
                            <li><label className="flex items-center gap-2"><input type="radio" name="trade" /> Quantity not match with contract</label></li>
                            <li><label className="flex items-center gap-2"><input type="radio" name="trade" /> Shipment problem</label></li>
                            <li><label className="flex items-center gap-2"><input type="radio" name="trade" /> Quality not as agreed</label></li>
                            <li><label className="flex items-center gap-2"><input type="radio" name="trade" /> Packaging not as agreed</label></li>
                            <li><label className="flex items-center gap-2"><input type="radio" name="trade" /> Other trade dispute</label></li>
                          </ul>
                      </div>
                      
                      {/* Intellectual Property */}
                      <div>
                        <h3 className="font-semibold mb-4">
                          Report an Intellectual Property Infringement
                        </h3>

                        <ul className="space-y-2 text-sm">
                          <li><label className="flex items-center gap-2"><input type="radio" name="ip" /> Report an Intellectual Property Infringement</label></li>
                          <li><label className="flex items-center gap-2"><input type="radio" name="ip" /> Picture Embezzlement</label></li>
                          <li><label className="flex items-center gap-2"><input type="radio" name="ip" /> Copyright Infringement (including DMCA)</label></li>
                          <li><label className="flex items-center gap-2"><input type="radio" name="ip" /> Trademark Infringement</label></li>
                          <li><label className="flex items-center gap-2"><input type="radio" name="ip" /> Patent Infringement</label></li>
                        </ul>
                      </div>
                    </div>
                    {showSuccess && (
  <div className="mb-4 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded">
    ✅ Your complaint has been submitted successfully
  </div>
)}

                     
         {/* Submit Button */}
              <div className="text-center mt-6">
                <button onClick={handleSubmitComplaint}
 className="bg-sky-800 text-white px-8 py-2 rounded hover:bg-sky-700 transition">
                  Submit
                </button>    
              </div>
            </div>

            {/* RIGHT : Image */}
            <div className="w-full md:w-1/3 order-2">
              <img
                src="/homepage/Our-team-Image.webp"
                alt="Customer Support"
                className="w-full h-full object-cover rounded-md shadow-md"
              />
            </div>
          </div>  
        </div>
    </div>
    </section>
  );
};

export default ContactForm;
