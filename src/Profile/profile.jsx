import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const attendanceData = [
  { week: 1, present: 35, absent: 22 },
  { week: 2, present: 40, absent: 18 },
  { week: 3, present: 38, absent: 20 },
  { week: 4, present: 45, absent: 14 },
  { week: 5, present: 42, absent: 16 },
  { week: 6, present: 48, absent: 10 },
  { week: 7, present: 50, absent: 8 },
  { week: 8, present: 44, absent: 15 },
  { week: 9, present: 46, absent: 13 },
  { week: 10, present: 49, absent: 11 },
  { week: 11, present: 47, absent: 9 },
  { week: 12, present: 52, absent: 7 },
];

const studentData = [
  { name: "Males", value: 59 },
  { name: "Females", value: 41 },
];

const COLORS = ["#0f766e", "#a37931"];

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

  // Helper to get display label
  const getLabel = (key) => {
    const labels = {
      course: "Course",
      year: "Year",
      department: "Department",
      program: "Program",
      student: "Student"
    };
    return labels[key] || key;
  };

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

        {/* Info Cards - Dynamic based on selections */}
        <div className="flex flex-wrap gap-4 mb-6">
          {activeSelections.length > 0 ? (
            activeSelections.map(([key, value], i) => (
              <div
                key={i}
                className="flex-1 min-w-[180px] bg-teal-50 border border-teal-200 rounded-lg p-4 text-center text-sm font-medium text-teal-700"
              >
                {getLabel(key)}: {value}
              </div>
            ))
          ) : (
            [
              "Program: Computer Science",
              "Department: Computing",
              "Year: 4",
              "Program of Study: BSc Computing"
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 min-w-[180px] bg-teal-50 border border-teal-200 rounded-lg p-4 text-center text-sm font-medium text-teal-700"
              >
                {item}
              </div>
            ))
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Attendance</h3>
            <p className="text-xs text-gray-500 mb-4">
              Present and Absent Students
            </p>

            <BarChart width={500} height={300} data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#0f766e" />
              <Bar dataKey="absent" fill="#a37931" />
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
            <h3 className="font-semibold mb-4">Students</h3>

            <PieChart width={300} height={300}>
              <Pie
                data={studentData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                label
              >
                {studentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>

            {/* Legend */}
            <div className="flex gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-teal-700 rounded-full"></span> Males
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Females
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;