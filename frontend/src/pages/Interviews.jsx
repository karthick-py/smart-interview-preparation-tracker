import { useEffect, useState } from "react";
import API_URL from "../services/Api.jsx";

function Interviews() {

  const [interviews, setInterviews] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Get Interviews
  const getInterviews = () => {
    fetch(`${API_URL}/interviews`)
      .then((response) => response.json())
      .then((data) => {
        setInterviews(data);
      });
  };

  // Add Interview
  const addInterview = () => {
      if (
    !companyName.trim() ||
    !role.trim() ||
    !interviewDate
  ) {
    alert("All fields are required");
    return;
  }
    fetch(`${API_URL}/interviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: companyName,
        role,
        interview_date: interviewDate,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setCompanyName("");
        setRole("");
        setInterviewDate("");
        setStatus("Pending");

        getInterviews();
      });
  };

  // Update Interview
  const updateInterview = () => {
    fetch(`${API_URL}/interview/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: companyName,
        role,
        interview_date: interviewDate,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setEditId(null);

        setCompanyName("");
        setRole("");
        setInterviewDate("");
        setStatus("Pending");

        getInterviews();
      });
  };

  // Delete Interview
  const deleteInterview = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this interview?"
  );

  if (!confirmDelete) {
     return;
  }
    fetch(`${API_URL}/interview/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        getInterviews();
      });
  };

  useEffect(() => {
    getInterviews();
  }, []);

  const filteredInterviews = interviews.filter((interview) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    if (!isNaN(searchText)) {
      return interview.id.toString() === searchText;
    }

    return (
      interview.company_name.toLowerCase().includes(searchText) ||
      interview.role.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="page">

      <h2>Interviews Management</h2>

      <div className="form-container">

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

  <div className="button-group">

  <button
    onClick={() => {
      if (editId) {
        updateInterview();
      } else {
        addInterview();
      }
    }}
  >
    {editId ? "Update Interview" : "Add Interview"}
  </button>

  {editId && (
    <button
      onClick={() => {
        setEditId(null);
        setCompanyName("");
        setRole("");
        setInterviewDate("");
        setStatus("Pending");
      }}
    >
      Cancel
    </button>
  )}

  </div>

      </div>

      <br />

      <input
        type="text"
        placeholder="Search Interview..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Role</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

    {filteredInterviews.length === 0 ? (

      <tr>
        <td colSpan="6">
          No Interviews Found
        </td>
      </tr>

    ) : (

      filteredInterviews.map((interview) => (
        <tr key={interview.id}>
          <td>{interview.id}</td>
          <td>{interview.company_name}</td>
          <td>{interview.role}</td>
          <td>{interview.interview_date}</td>
          <td>{interview.status}</td>

          <td>

            <button
              className="edit-btn"
              onClick={() => {
                setEditId(interview.id);

                setCompanyName(interview.company_name);
                setRole(interview.role);
                setInterviewDate(interview.interview_date);
                setStatus(interview.status);
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteInterview(interview.id)}
            >
              Delete
            </button>

          </td>
        </tr>
      ))

    )}

  </tbody>

      </table>

    </div>
  );
}

export default Interviews;