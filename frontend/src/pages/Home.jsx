import HeroSection from "../components/home/HeroSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ReviewSlider from "../components/home/ReviewSlider";
import FAQSection from "../components/home/FAQSection";
import InquirySection from "../components/home/InquirySection";
import TrendingProducts from "../components/home/TrendingProducts";
import TopCategories from "../components/home/TopCategories";
import PreviousDetails from "../components/home/previousDetails";


const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <TopCategories />
      <TrendingProducts />
      <InquirySection />
      <WhyChooseUs />
      <ReviewSlider />
      <FAQSection />
      <PreviousDetails />
    </div>
  );
};

export default Home;

