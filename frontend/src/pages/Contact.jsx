import axios from "axios";
import ContactForm from "../components/layout/forms/ContactForm";;

const ContactPage = () => {
  const handleFormSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contacts`,
        data
      );

      if (res.data.success) {
        alert("Thank you! Your message has been sent.");
      }
    } catch (error) {
      console.error("Contact submit error: ", error);
      alert(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section>
      <ContactForm
      title="Contact Us"
      buttonText="Submit"
      onSubmit={handleFormSubmit} 
      />
    </section>
  )
}

export default ContactPage;