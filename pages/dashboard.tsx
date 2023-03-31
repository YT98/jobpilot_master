import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "./_useAuth";

const Dashboard = () => {
  useAuth();

  return (
    <div className="flex bg-zinc-50">
      <Sidebar firstName="Placeholder" lastName="Placeholder"/>
      <div className="flex-1 p-10">
        <DashboardCard>
          <p className="text-gray-600 mb-4">Welcome Back, <span className="font-bold">John Doe!</span></p>
          <p className="text-gray-600"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pharetra, leo nec dictum laoreet, sapien orci aliquam nulla, placerat ullamcorper magna orci a lacus.</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
