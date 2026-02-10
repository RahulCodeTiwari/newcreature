
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const InquirySection = () => {
  const countries = [
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
  ];

  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone) {
      toast.error("Please enter phone number");
      return;
    }

      // ✅ min 7 & max 10 digit validation
  if (phone.length < 7 || phone.length > 10) {
    toast.error("Phone number must be valid");
    return;
  }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contacts`, {
        name: "Homepage Inquiry",
        phone: countryCode + phone,
        message,
      });

      toast.success("Inquiry submitted successfully");

      // reset
      setPhone("");
      setMessage("");
      setCountryCode("+91");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-4 bg-white">
      <div className="flex justify-center">
        <div
          className="w-full max-w-6xl bg-[rgb(227,229,238)] rounded-3xl 
          p-4 flex flex-col items-center text-center
          md:flex-row md:items-start md:text-left
          md:p-10 md:gap-20"
        >
          {/* LEFT IMAGE */}
          <div className="w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src="/homepage/Contactus-form.png"
              alt="Inquiry"
              className="rounded-2xl w-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold uppercase">
              Post by Requirement
            </h2>

            <p className="text-gray-600 mt-2">
              Submit your requirements and get customized quotes from us.
            </p>

            {/* Requirement */}
            <div className="w-full mt-6 bg-white rounded-2xl p-6 shadow">
              <textarea
                placeholder="Please enter the product details you are looking for."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full outline-none text-sm text-gray-600 resize-none"
                rows={3}
              />
            </div>

            {/* Phone */}
            <div className="mt-6 flex justify-center gap-2">
              <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="outline-none bg-transparent text-sm font-medium"
                >
                  {countries.map((c, i) => (
                    <option key={i} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                maxLength={10}
                className="flex-1 bg-white rounded-xl px-4 py-3 shadow outline-none text-sm"
              />
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-center md:justify-end w-full">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#0A3D62] text-white px-10 py-3 rounded-xl font-semibold hover:bg-[#062c47] transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
