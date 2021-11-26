import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const PageViewsTracking = () => {
  const location = useLocation();
  ReactGA.pageview(`${window.location.origin}${location.pathname}`);

  return null;
};

export default PageViewsTracking;
