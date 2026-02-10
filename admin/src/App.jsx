import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    
    <BrowserRouter>
      <AdminRoutes />
        <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
