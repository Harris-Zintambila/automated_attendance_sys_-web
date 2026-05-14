import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zm0-8h8V3h-8v10zm-10 8h8v-6H3v6z" />
        </svg>
      ),
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Assign Invigilator",
      path: "/assign",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M20 6h-4.18A3 3 0 0 0 13 4H9a3 3 0 0 0-2.82 2H2v2h1.18A3 3 0 0 0 7 11v1H5v2h2v3h2v-3h2v3h2v-3h2v-2h-2v-1a3 3 0 0 0 3-3h1V6zm-6 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-teal-50 border-r border-teal-200 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-teal-300 bg-white text-teal-700 shadow-sm hover:bg-teal-100 transition"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center mb-6 pt-4 px-2 overflow-hidden">
        {/* Avatar */}
        <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Label should fade out when collapsed */}
        <h2
          className={`mt-2 text-xs text-gray-500 text-center whitespace-nowrap transition-all duration-200 ${
            isOpen ? "opacity-100 max-h-10" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          MAIN NAVIGATION MENU
        </h2>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={!isOpen ? item.name : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded-lg transition-colors duration-150 ${
                isActive ? "bg-teal-700 text-white" : "text-gray-600 hover:bg-teal-100"
              } ${!isOpen ? "justify-center" : ""}`
            }
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>

            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-200 text-sm font-medium ${
                isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
              }`}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;