import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

const defaultAdmin = {
  name: "Harris Zintambila",
  email: "harriszintambila9@gmail.com",
  role: "Administrator",
};

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function AdminMenu({ admin = defaultAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const adminName = admin?.name || defaultAdmin.name;
  const adminEmail = admin?.email || defaultAdmin.email;
  const adminRole = admin?.role || defaultAdmin.role;
  const initials = getInitials(adminName);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSettings = () => {
    setIsOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div ref={menuRef} className="relative inline-flex justify-end">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/95 px-2 py-1.5 text-left text-gray-700 shadow-sm transition duration-200 hover:border-teal-300 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-500 sm:px-3"
        aria-label="Open admin profile menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white shadow-sm">
          {initials || <FiUser className="h-5 w-5" aria-hidden="true" />}
        </span>

        <span className="hidden max-w-[160px] flex-col sm:flex">
          <span className="truncate text-sm font-semibold leading-5 text-gray-800">
            {adminName}
          </span>
          <span className="truncate text-xs leading-4 text-gray-500">
            {adminRole}
          </span>
        </span>

        <FiChevronDown
          className={`hidden h-4 w-4 text-gray-500 transition-transform duration-200 sm:block ${
            isOpen ? "rotate-180 text-teal-700" : "group-hover:text-teal-700"
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-3 w-[calc(100vw-2rem)] max-w-80 origin-top-right rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10 ring-1 ring-black/5 transition duration-200 sm:w-80 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
        role="menu"
        aria-label="Admin profile options"
      >
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100 text-base font-bold text-teal-700">
              {initials || <FiUser className="h-5 w-5" aria-hidden="true" />}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {adminName}
              </p>
              <p className="truncate text-xs text-gray-500">{adminEmail}</p>
              <p className="mt-1 inline-flex rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                {adminRole}
              </p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button
            type="button"
            onClick={handleSettings}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition duration-150 hover:bg-teal-50 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            role="menuitem"
          >
            <FiSettings className="h-4 w-4" aria-hidden="true" />
            Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition duration-150 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            role="menuitem"
          >
            <FiLogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
