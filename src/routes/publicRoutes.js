import { Route, Routes } from "react-router";
import Home from "../pages/public/Home";
import Members from "../pages/public/Members";
import MemberPage from "../pages/public/Members/components/MemberPage";

export const publicRouteSlug = {
  HOME: "/",
  MEMBERS: "/members/",
  MEMBER: "/member/",
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={publicRouteSlug.HOME} element={<Home />} />
      <Route path={publicRouteSlug.MEMBERS} element={<Members />} />
      <Route path={`${publicRouteSlug.MEMBER}:memberName`} element={<MemberPage />} />
    </Routes>
  );
};

export default PublicRoutes;
