import ContentHeader from "../../../components/ContentHeader";
import { setPageTitleAdmin } from "../../../utils/html.util";

const Dashboard = () => {
  setPageTitleAdmin("Dashboard");
  return (
    <div className="w-full p-8">
      <ContentHeader className="mb-6">Dashboard</ContentHeader>

      <div>TES</div>
    </div>
  );
};

export default Dashboard;
