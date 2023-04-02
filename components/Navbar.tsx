import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppContext } from "../contexts/AppContext";
import { useContext, useState } from "react";

const Navbar = () => {
  const { appState } = useContext(AppContext);
  const firstName = appState.user ? appState.user.firstName : '';
  const lastName = appState.user ? appState.user.lastName : '';

  const router = useRouter();  

  return (
    <div className="navbar bg-base-100 border-2 border-solid border-gray-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/dashboard" className={router.pathname == "/dashboard" ? "font-bold" : ""}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className={router.pathname == "/profile" ? "font-bold" : ""}>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/job-postings" className={router.pathname == "/job-postings" ? "font-bold" : ""}>
                Job Postings
              </Link>
            </li>
            <li>
              <Link href="/signout" className="font-bold text-red-400">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <button className="btn btn-ghost normal-case text-xl">
          <Link href="/">JobPilot</Link>
        </button>
      </div>  

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>

    </div>
  )
}

export default Navbar
