
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const location = useLocation();
  const [selections, setSelections] = useState({
    course: "",
    year: "",
    department: "",
    program: "",
    student: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelections({
      course: params.get("course") || "",
      year: params.get("year") || "",
      department: params.get("department") || "",
      program: params.get("program") || "",
      student: params.get("student") || ""
    });
  }, [location.search]);

  // Filter out empty selections
  const activeSelections = Object.entries(selections).filter(([_, value]) => value);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-teal-50 border-r border-teal-200 p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
          </div>
          <h2 className="mt-2 text-sm text-gray-600">MAIN NAVIGATION MENU</h2>
        </div>

        <nav className="space-y-2">
           <Link to="/">
         <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">
          Dashboard
       </button>
         </Link>
         <Link to="/analytics">
            <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">
            Analytics
          </button>
          </Link>
          <Link to="/assign">
         <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">
          Assign Invigilator
       </button>
         </Link>
           <Link to="/profile">
         <button className="w-full bg-teal-700 py-2 text-white rounded-lg">
          Profile
       </button>
         </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* Header */}
        <div className="bg-teal-500 text-white px-4 py-3 gap-4 rounded-lg mb-4">
          Profile
        </div>

        {/* Dynamic Heading - Show selected filters */}
        {activeSelections.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <h2 className="text-lg font-semibold text-teal-700 mb-2">
              Analytics for:
            </h2>
          </div>
        )}

      </main>
    </div>
  );
}

export default Profile;