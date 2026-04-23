import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
import { CgProfile } from "react-icons/cg";
import { SiSimpleanalytics } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { LiaPenSolid } from "react-icons/lia";

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div style={styles.app}>
      <div style={styles.mainContainer}>
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'profile' && <div>Profile Page</div>}
        {currentPage === 'assigninvigilator' && <div>Assign Invigilator Page</div>}
        {currentPage === 'analytics' && <div>Analytics Page</div>}
      </div>
    </div>
  );
};

const Sidebar = ({ setCurrentPage, currentPage }) => (
  <div style={styles.sidebar}>
    <div style={styles.userSection}>
      <div style={styles.userAvatarLarge}>
        <CgProfile />
      </div>
      <div style={styles.userLabel}>MAIN NAVIGATION MENU</div>
    </div>

    <nav style={styles.nav}>
      <NavItem icon={<RxDashboard />} label="Dashboard" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
      <NavItem icon={<CgProfile />} label="Profile" active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
      <NavItem icon={<LiaPenSolid />} label="Assign Invigilator" active={currentPage === 'assigninvigilator'} onClick={() => setCurrentPage('assigninvigilator')} />
      <NavItem icon={<SiSimpleanalytics />} label="Analytics" active={currentPage === 'analytics'} onClick={() => setCurrentPage('analytics')} />
    </nav>
  </div>
);

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div style={{
    ...styles.navItem,
    ...(active ? styles.navItemActive : {})
  }} onClick={onClick}>
    <span style={styles.navIcon}>{icon}</span>
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
        { name: "Females", value: 41, color: "#EF4444" }
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
    <div style={styles.dashboard}>
      <div style={styles.analyticsHeader}>Analytics</div>

      {/* Course Selector */}
      <div style={{ marginBottom: '15px' }}>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} style={styles.select}>
          <option value="com411">COM 411</option>
          {/* Add more options */}
        </select>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsCards}>
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsContainer}>
        <div style={styles.chartWrapper}>
          <h3 style={styles.chartTitle}>Attendance</h3>
          <p style={styles.chartSubtitle}>Present and Absent Students</p>
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
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: "#14B8A6" }}></div>
              <span>Present</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: "#FFB800" }}></div>
              <span>Absent</span>
            </div>
          </div>
        </div>

        <div style={styles.chartWrapper}>
          <h3 style={styles.chartTitle}>Students</h3>
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
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: "#14B8A6" }}></div>
              <span>Males</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: "#EF4444" }}></div>
              <span>Females</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value }) => (
  <div style={styles.statCard}>
    <p style={styles.statValue}>{value}</p>
  </div>
);

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f3f4f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden"
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#CCFBF1",
    padding: "25px 20px",
    borderRight: "2px solid #0D7377",
    overflowY: "auto",
    boxShadow: "2px 0 8px rgba(0,0,0,0.08)"
  },
  userSection: {
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #A7F3D0"
  },
  userAvatarLarge: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#CCCCCC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "45px",
    margin: "0 auto 15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  userLabel: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#0D7377",
    letterSpacing: "1px",
    lineHeight: "1.5"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  navItem: {
    padding: "14px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "14px",
    color: "#333",
    transition: "all 0.3s ease",
    backgroundColor: "transparent",
    fontWeight: "500"
  },
  navItemActive: {
    backgroundColor: "#0D7377",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(13,115,119,0.3)"
  },
  navIcon: {
    fontSize: "18px"
  },
  dashboard: {
    flex: 1,
    padding: "20px 25px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  },
  analyticsHeader: {
    backgroundColor: "#14B8A6",
    color: "white",
    padding: "12px 15px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "15px",
    flexShrink: 0
  },
  statsCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "20px",
    flexShrink: 0
  },
  statCard: {
    backgroundColor: "#CCFBF1",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #99F6E0"
  },
  statValue: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
    color: "#0D7377"
  },
  chartsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    flex: 1,
    overflow: "hidden"
  },
  chartWrapper: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },
  chartTitle: {
    margin: "0 0 3px 0",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#333"
  },
  chartSubtitle: {
    margin: "0 0 10px 0",
    fontSize: "11px",
    color: "#999"
  },
  legend: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "10px",
    flexShrink: 0
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px"
  },
  legendColor: {
    width: "10px",
    height: "10px",
    borderRadius: "2px"
  },
  select: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "white"
  }
};

export default App;