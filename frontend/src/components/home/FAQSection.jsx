import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Why Choose Creature Industry",
    a: "Creature Industry offers high-quality, reliable food processing and packaging machines with strong after-sales support and fast delivery across India.",
  },
  {
    q: "What is the warranty period of your machines?",
    a: "Our machines come with standard warranty coverage. Extended warranty options are also available.",
  },
  {
    q: "Do you provide installation and training support?",
    a: "Yes, we provide full installation guidance and operator training.",
  },
  {
    q: "Do you offer after-sales service and spare parts?",
    a: "Yes, we offer complete after-sales service and readily available spare parts.",
  },
  {
    q: "Do you ship machines across India?",
    a: "Yes, we deliver machines across all major cities and regions of India.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-2 bg-gray-50">
      <h2 className="text-center text-lg font-bold mb-4">
        FAQs
      </h2>

      <div className="space-y-3">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-sky-50 shadow-xl rounded-lg p-4"
          >
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span className="font-semibold text-sm text-sky-900">
                {item.q}
              </span>
              <ChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <p className="text-sm text-gray-600 mt-3">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

