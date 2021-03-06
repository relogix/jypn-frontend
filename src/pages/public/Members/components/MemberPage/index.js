import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { publicRouteSlug } from "../../../../../routes/publicRoutes";
import DesktopVersion from "./DesktopVersion";
import MobileVersion from "./MobileVersion";
import Biography from "./memberSections/Biography";
import Profile from "./memberSections/Profile";
import Title from "./memberSections/Title";

const MemberPage = () => {
  const navigate = useNavigate();
  const { memberName } = useParams();

  const [member, setMember] = useState();
  useEffect(() => {
    let mounted = true;
    memberName &&
      axios
        .get(`${process.env.REACT_APP_API}/api/member-details?filters[member][name][$eq]=${memberName}&populate=*`)
        .then((res) => {
          if (mounted) {
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
