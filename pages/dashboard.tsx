import LogoutButton from "../components/LogoutButton";
import { useAuth } from "./_useAuth";

const Dashboard = () => {
  useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
