import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { LiaPenSolid } from "react-icons/lia";

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'profile' && <div>Profile Page</div>}
        {currentPage === 'assigninvigilator' && <div>Assign Invigilator Page</div>}
      </div>
    </div>
  );
};

const Sidebar = ({ setCurrentPage, currentPage }) => (
  <div className="w-60 bg-teal-50 p-5 border-r-2 border-teal-700 overflow-y-auto shadow-lg">
    <div className="text-center mb-8 pb-5 border-b-2 border-teal-200">
      <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg">
        <CgProfile />
      </div>
      <div className="text-xs font-bold text-teal-700 uppercase tracking-wider leading-relaxed">MAIN NAVIGATION MENU</div>
    </div>

    <nav className="flex flex-col gap-2">
      <NavItem icon={<RxDashboard />} label="Dashboard" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
      <NavItem icon={<CgProfile />} label="Profile" active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
      <NavItem icon={<LiaPenSolid />} label="Assign Invigilator" active={currentPage === 'assigninvigilator'} onClick={() => setCurrentPage('assigninvigilator')} />
    </nav>
  </div>
);

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div className={`p-4 rounded-md cursor-pointer flex items-center gap-4 text-sm text-gray-700 transition-all duration-300 ${active ? 'bg-teal-700 text-white font-bold shadow-md' : 'bg-transparent hover:bg-teal-100'}`} onClick={onClick}>
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </div>
);

const Dashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState('com411');
  const [stats, setStats] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  const dataLevels = {
    com411: {
      stats: ["Program: Computer Science", "Department: Computing", "Year: 4", "Program of Study: BSc Computing"],
      trend: [
        { week: "1", present: 35, absent: 22 },
        { week: "2", present: 40, absent: 17 },
        { week: "3", present: 38, absent: 19 },
        { week: "4", present: 45, absent: 12 },
        { week: "5", present: 42, absent: 15 },
        { week: "6", present: 48, absent: 9 },
        { week: "7", present: 50, absent: 7 },
        { week: "8", present: 44, absent: 13 },
        { week: "9", present: 46, absent: 11 },
        { week: "10", present: 49, absent: 8 },
        { week: "11", present: 48, absent: 9 },
        { week: "12", present: 51, absent: 6 }
      ],
      gender: [
        { name: "Males", value: 59, color: "#0D9488" },
        { name: "Females", value: 41, color: "#FFB800" }
      ]
    },
    // Add more courses/modules here
  };

  useEffect(() => {
    const data = dataLevels[selectedCourse] || dataLevels.com411;
    setStats(data.stats);
    setTrendData(data.trend);
    setGenderData(data.gender);
  }, [selectedCourse]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics");
        // For now, ignore backend, use mock
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 p-5 overflow-y-auto flex flex-col">
      <div className="bg-teal-500 text-white p-3 rounded-md text-sm font-bold mb-4 flex-shrink-0">Analytics</div>

      {/* Course Selector */}
      <div className="mb-4">
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="p-2 border border-gray-300 rounded-md text-sm bg-white">
          <option value="com411">COM 411</option>
          {/* Add more options */}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-3 mb-5 flex-shrink-0">
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
        <div className="bg-white p-4 rounded-md shadow-sm flex flex-col overflow-auto">
          <h3 className="text-sm font-bold mb-1">Attendance</h3>
          <p className="text-xs text-gray-500 mb-3">Present and Absent Students</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="week" label={{ value: "Number of Weeks", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Number of Students", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="present" fill="#14B8A6" />
              <Bar dataKey="absent" fill="#FFB800" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-3 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-teal-500"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-yellow-400"></div>
              <span>Absent</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm flex flex-col overflow-auto">
          <h3 className="text-sm font-bold mb-3">Students</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-3 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-teal-600"></div>
              <span>Males</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              <span>Females</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value }) => (
  <div className="bg-teal-50 p-4 rounded-lg text-center shadow-sm border border-teal-200">
    <p className="m-0 text-sm font-bold text-teal-700">{value}</p>
  </div>
);

export default App;