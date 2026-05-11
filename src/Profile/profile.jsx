import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/sidebar";

function Profile() {

  const [users, setUsers] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [toast, setToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const toastTimerRef = useRef(null);
  const successToastTimerRef = useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: ""
  });

  // FETCH USERS FROM FIREBASE
  const fetchUsers = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "users")
      );

      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(fetchedUsers);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchUsers();

    return () => {
      clearTimeout(toastTimerRef.current);
      clearTimeout(successToastTimerRef.current);
    };

  }, []);

  const handleFormChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const triggerSuccessToast = (message) => {

    if (successToastTimerRef.current) {
      clearTimeout(successToastTimerRef.current);
    }

    setSuccessToast({ message });

    successToastTimerRef.current = setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  // ADD / UPDATE USER
  const handleAddUser = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.role ||
      (editingIndex === null && !formData.password)
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      // UPDATE EXISTING USER
      if (editingIndex !== null) {

        const userToEdit = users[editingIndex];

        await updateDoc(
          doc(db, "users", userToEdit.id),
          {
            fullName: formData.name,
            email: formData.email,
            department: formData.department,
            role: formData.role,
          }
        );

        triggerSuccessToast(
          `${formData.name}'s profile updated successfully.`
        );

        setEditingIndex(null);

      } else {

        // CREATE AUTH ACCOUNT
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );

        const user = userCredential.user;

        // SAVE USER TO FIRESTORE
        await setDoc(doc(db, "users", user.uid), {
          fullName: formData.name,
          email: formData.email,
          department: formData.department,
          role: formData.role,
          status: "active",
          createdAt: new Date(),
        });

        triggerSuccessToast(
          `${formData.name} added successfully.`
        );
      }

      // REFRESH USERS
      fetchUsers();

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "",
      });

    } catch (error) {

      console.error(error);

      alert(error.message);
    }
  };

  // EDIT USER
  const handleEdit = (index) => {

    setFormData({
      name: users[index].fullName,
      email: users[index].email,
      password: "",
      department: users[index].department,
      role: users[index].role,
    });

    setEditingIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // DELETE USER
  const handleDelete = async (index) => {

    try {

      const userToDelete = users[index];

      await deleteDoc(
        doc(db, "users", userToDelete.id)
      );

      triggerSuccessToast(
        `${userToDelete.fullName} deleted successfully`
      );

      fetchUsers();

    } catch (error) {

      console.error(error);

      alert("Failed to delete user");
    }
  };

  const handleCancelEdit = () => {

    setEditingIndex(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      department: "",
      role: "",
    });
  };

  return (

    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* TOP BAR */}
        <div className="bg-teal-500 text-white px-4 py-3 rounded-lg mb-4 flex justify-between items-center relative">

          <span>Profile</span>

          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="rounded-full p-2 hover:bg-teal-600"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.0}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

          </button>

          {showProfileMenu && (

            <div className="absolute right-4 top-full mt-2 w-20 h-11 rounded-xl bg-teal-100 text-left shadow-lg">

              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/");
                }}
                className="w-full px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 rounded-lg"
              >
                Logout
              </button>

            </div>
          )}

        </div>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">

          <h2 className="text-xl font-semibold text-teal-700 mb-4">

            {editingIndex !== null
              ? "Edit Profile"
              : "Add New Profile"}

          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {/* NAME */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter name"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter email"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter password"
              />

            </div>

            {/* DEPARTMENT */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select department</option>

                <option value="Computer Science">
                  Computer Science
                </option>

                <option value="Mathematics">
                  Mathematics
                </option>

                <option value="Physics">
                  Physics
                </option>

                <option value="Biology">
                  Biology
                </option>

                <option value="Chemistry">
                  Chemistry
                </option>

              </select>

            </div>

            {/* ROLE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select role</option>

                <option value="Lecturer">
                  Lecturer
                </option>

                <option value="Invigilator">
                  Invigilator
                </option>

                <option value="Admin">
                  Admin
                </option>

              </select>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">

            {editingIndex !== null && (

              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 rounded-full font-semibold shadow-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              onClick={handleAddUser}
              className="px-6 py-2 rounded-full font-semibold shadow-md bg-teal-600 hover:bg-teal-700 text-white"
            >
              {editingIndex !== null
                ? "Save Changes"
                : "Add Profile"}
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">

          <h2 className="text-xl font-semibold text-teal-700 mb-4">
            Profiles
          </h2>

          <table className="w-full border border-gray-300">

            <thead>

              <tr className="bg-teal-600 text-white text-sm">

                <th className="p-3 text-left border">
                  NAME
                </th>

                <th className="p-3 text-left border">
                  EMAIL
                </th>

                <th className="p-3 text-left border">
                  DEPARTMENT
                </th>

                <th className="p-3 text-left border">
                  ROLE
                </th>

                <th className="p-3 text-center border">
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center text-gray-400 py-6 text-sm"
                  >
                    No profiles added yet.
                  </td>

                </tr>

              ) : (

                users.map((user, index) => (

                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >

                    <td className="p-2 border">
                      {user.fullName}
                    </td>

                    <td className="p-2 border">
                      {user.email}
                    </td>

                    <td className="p-2 border">
                      {user.department}
                    </td>

                    <td className="p-2 border">
                      {user.role}
                    </td>

                    <td className="p-2 border">

                      <div className="flex items-center justify-center gap-3">

                        <button
                          type="button"
                          onClick={() => handleEdit(index)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
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

      {/* SUCCESS TOAST */}
      {successToast && (

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-teal-700 text-white px-5 py-3 rounded-xl shadow-xl">

          <span className="text-sm">
            {successToast.message}
          </span>

        </div>
      )}

    </div>
  );
}

export default Profile;