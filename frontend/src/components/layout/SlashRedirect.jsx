import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search } = location;

    if (
      pathname !== "/" &&
      !pathname.endsWith("/")
    ) {
      navigate(pathname + "/" + search, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default SlashRedirect;
