import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";

function AssignInvigilator() {
  const [formData, setFormData] = useState({
    course: "",
    date: "",
    time: "",
    room: "",
    invigilator: ""
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [assignedInvigilators, setAssignedInvigilators] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const allInvigilators = [
    "Alice Banda",
    "Harris Zintambila",
    "King Nasimba",
    "Alex Mwale",
    "Gabriel Moyo",
    "Francis Gondwe",
  ];

  const recentInvigilators = [
    ...new Map(
      [...assignedInvigilators].reverse().map((a) => [a.invigilator, a.invigilator])
    ).values(),
  ].slice(0, 5);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "invigilator") {
      const query = value.trim().toLowerCase();
      if (query === "") {
        setSuggestions(recentInvigilators.length > 0 ? recentInvigilators : allInvigilators.slice(0, 5));
      } else {
        const matched = allInvigilators.filter((name) =>
          name.toLowerCase().includes(query)
        );
        setSuggestions(matched);
      }
      setShowSuggestions(true);
    }
  };

  const handleInvigilatorFocus = () => {
    const query = formData.invigilator.trim().toLowerCase();
    if (query === "") {
      setSuggestions(recentInvigilators.length > 0 ? recentInvigilators : allInvigilators.slice(0, 5));
    } else {
      const matched = allInvigilators.filter((n) => n.toLowerCase().includes(query));
      setSuggestions(matched);
    }
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (name) => {
    setFormData({ ...formData, invigilator: name });
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAssign = () => {
    if (formData.course && formData.date && formData.time && formData.room && formData.invigilator) {
      setAssignedInvigilators([...assignedInvigilators, { ...formData, status: "Pending" }]);
      setFormData({ course: "", date: "", time: "", room: "", invigilator: "" });
      setShowSuggestions(false);
    } else {
      alert("Please fill in all fields before assigning.");
    }
  };

  const handleMarkDone = (index) => {
    setAssignedInvigilators((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: "Done" } : item
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-teal-500 text-white px-4 py-3 rounded-lg mb-4 flex justify-between items-center relative">
          <span>Assign Invigilator</span>
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
                  <select name="course" value={formData.course} onChange={handleFormChange} className="w-full px-2 py-1 text-sm">
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
                    min={today}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} className="w-full px-2 py-1 text-sm" />
                </td>
                <td className="p-2 border border-gray-300">
                  <select name="room" value={formData.room} onChange={handleFormChange} className="w-full px-2 py-1 text-sm">
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

                {/* Invigilator with autocomplete */}
                <td className="p-2 border border-gray-300">
                  <div className="relative" ref={suggestionRef}>
                    <input
                      type="text"
                      name="invigilator"
                      value={formData.invigilator}
                      onChange={handleFormChange}
                      onFocus={handleInvigilatorFocus}
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                      placeholder="Search name..."
                      autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute left-0 top-full mt-1 z-50 w-56 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {formData.invigilator.trim() === "" && recentInvigilators.length > 0 && (
                          <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                            Recent
                          </div>
                        )}
                        {suggestions.map((name, i) => (
                          <button
                            key={i}
                            type="button"
                            onMouseDown={() => handleSelectSuggestion(name)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300 shrink-0">
                              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                            {formData.invigilator.trim() === "" ? (
                              <span>{name}</span>
                            ) : (
                              <span dangerouslySetInnerHTML={{
                                __html: name.replace(
                                  new RegExp(`(${formData.invigilator.trim()})`, "gi"),
                                  '<mark class="bg-teal-100 text-teal-800 rounded px-0.5">$1</mark>'
                                )
                              }} />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-gray-600 text-sm mb-2 mt-3">
            Before confirming ensure that the exam details are correct, the invigilator is available at the selected time, the venue is correct, and no scheduling conflict exists.{" "}
            <span className="text-red-600 font-semibold">Assign the Invigilator only after verifying all information.</span>
          </p>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAssign}
              disabled={!formData.course || !formData.date || !formData.time || !formData.room || !formData.invigilator}
              className={`font-semibold px-8 py-2 rounded-full shadow-md transition-colors ${
                !formData.course || !formData.date || !formData.time || !formData.room || !formData.invigilator
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
              }`}
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
                    <th className="p-3 text-center border border-gray-300 whitespace-nowrap">ATTENDANCE STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedInvigilators.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-2 border border-gray-300">{item.course}</td>
                      <td className="p-2 border border-gray-300">{item.date}</td>
                      <td className="p-2 border border-gray-300">{item.time}</td>
                      <td className="p-2 border border-gray-300">{item.room}</td>
                      <td className="p-2 border border-gray-300">{item.invigilator}</td>
                      <td className="p-2 border border-gray-300 text-center">
                        {item.status === "Done" ? (
                          <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                            Done
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMarkDone(index)}
                            className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 hover:bg-teal-600 hover:text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            </svg>
                            Pending
                          </button>
                        )}
                      </td>
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