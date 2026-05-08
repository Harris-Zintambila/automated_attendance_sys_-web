import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Profile() {
  const [users, setUsers] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [toast, setToast] = useState(null); // { deletedUser, deletedIndex, timer }
  const toastTimerRef = useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: ""
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.department || !formData.role) {
      alert("Please fill in name, email, department, and role.");
      return;
    }

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { ...formData };
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, { ...formData }]);
    }

    setFormData({ name: "", email: "", department: "", role: "" });
  };

  const handleEdit = (index) => {
    setFormData({ ...users[index] });
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    const deletedUser = users[index];

    // Remove user immediately
    setUsers((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setFormData({ name: "", email: "", department: "", role: "" });
    }

    // Clear any existing toast timer
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    // Show toast
    setToast({ deletedUser, deletedIndex: index });

    // Auto-dismiss after 5 seconds
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (!toast) return;
    clearTimeout(toastTimerRef.current);

    // Re-insert the deleted user at their original position
    setUsers((prev) => {
      const updated = [...prev];
      updated.splice(toast.deletedIndex, 0, toast.deletedUser);
      return updated;
    });

    setToast(null);
  };

  const handleDismissToast = () => {
    clearTimeout(toastTimerRef.current);
    setToast(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(toastTimerRef.current);
  }, []);

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormData({ name: "", email: "", department: "", role: "" });
  };

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
          <Link to="/dashboard"><button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">Dashboard</button></Link>
          <Link to="/analytics"><button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">Analytics</button></Link>
          <Link to="/assign"><button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">Assign Invigilator</button></Link>
          <Link to="/profile"><button className="w-full text-white py-2 bg-teal-700 rounded-lg">Profile</button></Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-teal-500 text-white px-4 py-3 rounded-lg mb-4 flex justify-between items-center relative">
          <span>Profile</span>
          <button type="button" onClick={() => setShowProfileMenu(!showProfileMenu)} className="rounded-full p-2 hover:bg-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>
          {showProfileMenu && (
            <div className="absolute right-4 top-full mt-2 w-20 h-11 rounded-xl bg-teal-100 text-left shadow-lg ring-1 ring-black ring-opacity-5">
              <button type="button" onClick={() => { setShowProfileMenu(false); navigate("/"); }} className="w-full px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 transition-colors rounded-lg">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">
            {editingIndex !== null ? "Edit Profile" : "Add New Profile"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Enter name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select name="department" value={formData.department} onChange={handleFormChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
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
              <select name="role" value={formData.role} onChange={handleFormChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option value="">Select role</option>
                <option value="lecturer">Lecturer</option>
                <option value="invigilator">Invigilator</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            {editingIndex !== null && (
              <button type="button" onClick={handleCancelEdit} className="px-6 py-2 rounded-full font-semibold shadow-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleAddUser}
              disabled={!formData.name || !formData.email || !formData.department || !formData.role}
              className={`px-6 py-2 cursor-pointer rounded-full font-semibold shadow-md transition-colors ${
                formData.name && formData.email && formData.department && formData.role
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {editingIndex !== null ? "Save Changes" : "Add Profile"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Profiles</h2>
          <table className="w-full min-w-full border border-gray-300">
            <thead>
              <tr className="bg-teal-600 text-white text-sm">
                <th className="w-1/4 p-3 text-left border border-gray-300 whitespace-nowrap">NAME</th>
                <th className="w-1/4 p-3 text-left border border-gray-300 whitespace-nowrap">EMAIL</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">DEPARTMENT</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">ROLE</th>
                <th className="p-3 text-center border border-gray-300 whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-6 text-sm">No profiles added yet.</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="w-1/4 p-2 border border-gray-300">{user.name}</td>
                    <td className="w-1/4 p-2 border border-gray-300">{user.email}</td>
                    <td className="p-2 border border-gray-300">{user.department}</td>
                    <td className="p-2 border border-gray-300 capitalize">{user.role}</td>
                    <td className="p-2 border border-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <button type="button" onClick={() => handleEdit(index)} title="Edit" className="text-teal-600 hover:text-teal-800 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button type="button" onClick={() => handleDelete(index)} title="Delete" className="text-red-500 hover:text-red-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-xl animate-fade-in-up">
          {/* Trash icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-red-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <span className="text-sm">
            <span className="font-semibold">{toast.deletedUser.name}</span> was deleted.
          </span>
          <button
            type="button"
            onClick={handleUndo}
            className="text-teal-300 hover:text-teal-100 text-sm font-bold underline underline-offset-2 transition-colors"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={handleDismissToast}
            className="text-gray-400 hover:text-white transition-colors ml-1"
            title="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-teal-400 rounded-b-xl animate-shrink-bar" style={{ animationDuration: "5000ms" }} />
        </div>
      )}

      {/* Toast animation styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes shrink-bar {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        .animate-shrink-bar {
          animation: shrink-bar linear forwards;
          
        }
      `}</style>
    </div>
  );
}

export default Profile;