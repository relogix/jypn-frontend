import Footer from "../../templates/Footer";
import MemberCover from "./components/MemberCover";

const Members = () => {
  return (
    <div className="flex flex-col">
      <MemberCover isLogoShow />
      <Footer />
    </div>
  );
};

export default Members;
