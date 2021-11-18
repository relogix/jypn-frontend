import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicTemplateWrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default PublicTemplateWrapper;
