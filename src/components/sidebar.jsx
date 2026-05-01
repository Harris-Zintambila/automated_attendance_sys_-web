import { Link } from "react-router-dom";

function Sidebar({ active }) {
  const linkClasses = (page) =>
    `w-full py-2 rounded-lg ${
      active === page ? "bg-teal-700 text-white" : "text-gray-600 hover:bg-teal-100"
    }`;

  return (
    <aside className="w-64 bg-teal-50 border-r border-teal-200 p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="mt-2 text-sm text-gray-600">MAIN NAVIGATION MENU</h2>
      </div>

      <nav className="space-y-2">
        <Link to="/">
          <button type="button" className={linkClasses("dashboard")}>
            Dashboard
          </button>
        </Link>
        <Link to="/analytics">
          <button type="button" className={linkClasses("analytics")}>
            Analytics
          </button>
        </Link>
        <Link to="/assign">
          <button type="button" className={linkClasses("assign")}>
            Assign Invigilator
          </button>
        </Link>
        <Link to="/profile">
          <button type="button" className={linkClasses("profile")}>
            Profile
          </button>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
