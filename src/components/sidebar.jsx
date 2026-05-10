import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Assign Invigilator", path: "/assign" },
    { name: "Profile", path: "/profile" }
  ];

  return (
    <aside className="w-64 bg-teal-50 border-r border-teal-200 p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="mt-2 text-sm text-gray-600">MAIN NAVIGATION MENU</h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full block text-left py-2 rounded-lg transition ${
                isActive ? "bg-teal-700 text-white" : "text-gray-600 hover:bg-teal-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
