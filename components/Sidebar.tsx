import Link from 'next/link';
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const Sidebar = () => {
  const { appState } = useContext(AppContext);
  const firstName = appState.user ? appState.user.firstName : '';
  const lastName = appState.user ? appState.user.lastName : '';

  return (
    <div className="bg-slate-800 w-64 px-6 py-8 min-h-screen shadow-lg">
      <nav>
        <ul>
          <li className="mb-4 text-lg text-white font-black">
            {firstName} {lastName}
          </li>
          <li className="mb-4">
            <Link className="text-white" href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link className="text-white" href="/profile">
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link className="text-white" href="/signout">
              Logout
            </Link>
          </li>
          
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
