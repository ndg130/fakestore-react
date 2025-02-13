import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the route changes

  return null;
}

export default ScrollToTop;