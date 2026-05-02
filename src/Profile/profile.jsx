import { Link } from "react-router-dom";
import { useState } from "react";

function Profile() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: ""
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.department || !formData.role) {
      alert("Please fill in name, email, department, and role.");
      return;
    }

    setUsers([...users, { ...formData }]);
    setFormData({ name: "", email: "", department: "", role: "lecturer" });
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-teal-50 border-r border-teal-200 p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
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
          <Link to="/dashboard">
            <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">Dashboard</button>
          </Link>
          <Link to="/analytics">
            <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">Analytics</button>
          </Link>
          <Link to="/assign">
            <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">Assign Invigilator</button>
          </Link>
          <Link to="/profile">
            <button className="w-full text-white py-2 bg-teal-700 rounded-lg">Profile</button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-teal-500 text-white px-4 py-3 gap-4 rounded-lg mb-4">Profile</div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Add New Profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select role</option>
                <option value="lecturer">Lecturer</option>
                <option value="invigilator">Invigilator</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleAddUser}
              disabled={!formData.name || !formData.email || !formData.department || !formData.role}
              className={`px-6 py-2 rounded-full font-semibold shadow-md transition-colors ${formData.name && formData.email && formData.department && formData.role ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            >
              Add Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Profiles</h2>
          <table className="w-full min-w-full border border-gray-300">
            <thead>
              <tr className="bg-teal-600 text-white text-sm">
                <th className="w-1/4 p-3 text-left border border-gray-300 whitespace-nowrap">NAME</th>
                <th className="w-1/4 p-3 text-left border border-gray-300 whitespace-nowrap">EMAIL</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">DEPARTMENT</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">ROLE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="w-1/4 p-2 border border-gray-300">{user.name}</td>
                  <td className="w-1/4 p-2 border border-gray-300">{user.email}</td>
                  <td className="p-2 border border-gray-300">{user.department}</td>
                  <td className="p-2 border border-gray-300">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Profile;