import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { publicRouteSlug } from "../../../../../routes/publicRoutes";
import DesktopVersion from "./DesktopVersion";
import Biography from "./memberSections/Biography";
import Profile from "./memberSections/Profile";
import Title from "./memberSections/Title";
import MobileVersion from "./MobileVersion";

const MemberPage = () => {
  const navigate = useNavigate();
  const { memberName } = useParams();

  const [member, setMember] = useState();
  useEffect(() => {
    let mounted = true;
    console.log("effect run");
    memberName &&
      axios
        .get(`${process.env.REACT_APP_API}/api/member-details?filters[member][name][$eq]=${memberName}&populate=*`)
        .then((res) => {
          console.log("response run");
          if (mounted) {
            console.log("mounted run");
            console.log(res.data);
            res.data?.data?.length ? setMember(res.data?.data[0]) : navigate(publicRouteSlug.MEMBERS);
          }
        });

    return () => {
      mounted = false;
    };
  }, [memberName]);

  // Sections
  const sections = [
    {
      name: "Title",
      Component: Title,
    },
    {
      name: "Profile",
      Component: Profile,
    },
    {
      name: "Biography",
      Component: Biography,
    },
  ];

  return (
    <div>
      <div className="hidden md:inline">
        <DesktopVersion member={member} memberName={memberName} sections={sections} />
      </div>
      <div className="md:hidden">
        <MobileVersion member={member} memberName={memberName} sections={sections} />
      </div>
    </div>
  );
};

export default MemberPage;
