import Link from 'next/link';

type SidebarProps = {
    firstName: string;
    lastName: string;
  };

const Sidebar = ({firstName, lastName}: SidebarProps) => {
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
