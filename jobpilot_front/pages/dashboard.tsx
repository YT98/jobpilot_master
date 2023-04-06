import Sidebar from "../components/Navbar";
import UICard from "../components/UICard";
import { useAuth } from "./_useAuth";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const Dashboard = () => {
  useAuth();
  const { appState } = useContext(AppContext);
  const firstName = appState.account ? appState.account.firstName : '';
  const lastName = appState.account ? appState.account.lastName : '';

  return (
    <div className="flex bg-zinc-50 min-h-full">
      <div className="flex-1 p-10">
        <UICard>
          <p className="text-gray-600 mb-4">Welcome Back, <span className="font-bold">{firstName}!</span></p>
          <p className="text-gray-600"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pharetra, leo nec dictum laoreet, sapien orci aliquam nulla, placerat ullamcorper magna orci a lacus.</p>
        </UICard>
      </div>
    </div>
  );
};

export default Dashboard;
