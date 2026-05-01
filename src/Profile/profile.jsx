import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

const departments = [
  "Biological Sciences",
  "Biomedical and Health Sciences",
  "Chemistry and Chemical Engineering",
  "Computing",
  "Geography, Earth Sciences and Environment",
  "Human Ecology and Agricultural Sciences",
  "Mathematical Sciences",
  "Physics and Electronics"
];

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "lecturer",
    department: ""
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.department) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/users", form);

      // 🔥 Instant update (no reload)
      setUsers((prev) => [...prev, res.data]);

      // Reset form
      setForm({
        name: "",
        email: "",
        role: "lecturer",
        department: ""
      });

    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="profile" />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col gap-6">

          <h2 className="text-xl font-bold text-teal-700">Profile Management</h2>

          {/* FORM */}
          <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-3">

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Role Dropdown */}
        <select
          className="border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="lecturer">Lecturer</option>
          <option value="invigilator">Invigilator</option>
        </select>

        {/* Department Dropdown */}
        <select
          className="border p-2 rounded"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleAdd}
          disabled={loading}
          className="col-span-1 md:col-span-4 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Profile"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>{user.department}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;