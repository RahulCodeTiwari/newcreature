import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/subCategoryPage";
import SubCategoryDetailPage from "./pages/SubCategoryDetailPage";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";
import { Toaster } from "react-hot-toast";
import SearchResultPage from "./pages/SearchResultPage";
import ScrollToTop from "./components/layout/ScrollToTop";


function App() {
  return (
    <> 
    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
    <Router>

      <ScrollToTop />


      <Navbar />
        <main className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
       
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />

            {/* sirf public pages yahan */}
          <Route path="/categories" element={<CategoryPage />} />
              
          <Route
             path="/categories/:slug"
            element={<SubCategoryPage />}
          />

          <Route path="/subcategory/:slug" element={<SubCategoryDetailPage />} />
          <Route path="/search" element={<SearchResultPage />} />


             <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />


          </Routes>
        </main>

      <Footer />
    </Router>
    </>
  );
}

export default App;

