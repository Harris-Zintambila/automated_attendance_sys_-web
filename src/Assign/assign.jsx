import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AssignInvigilator() {
  // State for form inputs
  const [formData, setFormData] = useState({
    course: "",
    date: "",
    time: "",
    room: "",
    invigilator: ""
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  // State for assigned invigilators
  const [assignedInvigilators, setAssignedInvigilators] = useState([]);

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle assign button click
  const handleAssign = () => {
    if (formData.course && formData.date && formData.time && formData.room && formData.invigilator) {
      setAssignedInvigilators([...assignedInvigilators, { ...formData }]);
      // Clear form after assigning
      setFormData({
        course: "",
        date: "",
        time: "",
        room: "",
        invigilator: ""
      });
    } else {
      alert("Please fill in all fields before assigning.");
    }
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
          <Link to="/dashboard">
         <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">
          Dashboard
       </button>
         </Link>
         <Link to="/analytics">
            <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">
            Analytics
          </button>
          </Link>
          <button className="w-full text-white bg-teal-700 py-2 rounded-lg">
            Assign Invigilator
          </button>
           <Link to="/profile">
         <button className="w-full text-gray-600 py-2 hover:bg-teal-100 rounded-lg">
          Profile
       </button>
         </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="bg-teal-500 text-white px-4 py-3 rounded-lg mb-4 flex justify-between items-center relative">
          <span>Assign Invigilator</span>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="rounded-full p-2 hover:bg-teal-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>
          {showProfileMenu && (
            <div className="absolute right-4 top-full mt-2 w-20 h-11 rounded-xl bg-teal-100 text-left shadow-lg ring-1 ring-black ring-opacity-5">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/");
                }}
                className="w-full px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 transition-colors rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <table className="w-full min-w-full border border-gray-300">
            <thead>
              <tr className="bg-teal-600 text-white text-sm">
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">COURSE</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">DATE</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">TIME</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">VENUE</th>
                <th className="p-3 text-left border border-gray-300 whitespace-nowrap">INVIGILATOR</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-2 border border-gray-300">
                  <select 
                    name="course"
                    value={formData.course} 
                    onChange={handleFormChange}
                    className="w-full px-2 py-1 text-sm"
                  >
                    <option value="">Select Course</option>
                    <option>COM411</option>
                    <option>COM412</option>
                    <option>COM413</option>
                    <option>COM414</option>
                    <option>COM415</option>
                    <option>COM421</option>
                    <option>COM422</option>
                    <option>COM423</option>
                    <option>COM424</option>
                    <option>COM425</option>
                    <option>COM432</option>
                    <option>INF423</option>
                    <option>SCE411</option>
                  </select>
                </td>
                <td className="p-2 border border-gray-300">
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="w-full px-2 py-1 text-sm" 
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    className="w-full px-2 py-1 text-sm" 
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <select 
                    name="room"
                    value={formData.room}
                    onChange={handleFormChange}
                    className="w-full px-2 py-1 text-sm"
                  >
                    <option value="">Select Room</option>
                    <option>CK1</option>
                    <option>CK2</option>
                    <option>COMLAB1</option>
                    <option>COMLAB2</option>
                    <option>ROOM A</option>
                    <option>ROOM B</option>
                    <option>GREAT HALL</option>
                    <option>MW1</option>
                    <option>MW2</option>
                    <option>WADONDA</option>
                  </select>
                </td>
                <td className="p-2 border border-gray-300">
                  <input 
                    type="text" 
                    name="invigilator"
                    value={formData.invigilator}
                    onChange={handleFormChange}
                    className="w-full px-2 py-1 text-sm" 
                    placeholder="Name" 
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm mb-2 ">
            Before confirming ensure that the exam details are correct, the invigilator is available at the selected time, the venue is correct, and no scheduling conflict exists. Submit the form only after verifying all information. <span className="text-red-600 font-semibold">Assign the Invigilator only after verifying all information.</span>
          </p>
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleAssign}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-2 rounded-full shadow-md transition-colors"
            >
              Assign
            </button>
          </div>

          {/* Assigned Invigilators Table */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-teal-700 mb-3">Assigned Invigilators</h3>
            {assignedInvigilators.length > 0 ? (
              <table className="w-full min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-teal-600 text-white text-sm">
                    <th className="p-3 text-left border border-gray-300 whitespace-nowrap">COURSE</th>
                    <th className="p-3 text-left border border-gray-300 whitespace-nowrap">DATE</th>
                    <th className="p-3 text-left border border-gray-300 whitespace-nowrap">TIME</th>
                    <th className="p-3 text-left border border-gray-300 whitespace-nowrap">VENUE</th>
                    <th className="p-3 text-left border border-gray-300 whitespace-nowrap">INVIGILATOR</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedInvigilators.map((invigilator, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-2 border border-gray-300">{invigilator.course}</td>
                      <td className="p-2 border border-gray-300">{invigilator.date}</td>
                      <td className="p-2 border border-gray-300">{invigilator.time}</td>
                      <td className="p-2 border border-gray-300">{invigilator.room}</td>
                      <td className="p-2 border border-gray-300">{invigilator.invigilator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-sm">No invigilators assigned yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AssignInvigilator;