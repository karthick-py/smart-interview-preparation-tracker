import { useEffect, useState } from "react";
import API_URL from "../services/Api.jsx";

function Home() {

  const [counts, setCounts] = useState({
    total_users: 0,
    total_questions: 0,
    total_interviews: 0,
  });

  const getDashboardCounts = () => {
    fetch(`${API_URL}/dashboard`)
      .then((response) => response.json())
      .then((data) => {
        setCounts(data);
      });
  };

  useEffect(() => {
    getDashboardCounts();
  }, []);

return (
  <div className="page">

    <h2>Dashboard</h2>

    <div className="welcome-box">
      <h3>Welcome to Smart Interview Preparation Tracker</h3>

      <p>
        Manage Users, Questions and Interviews from one place.
      </p>

      <p>
        Built using React + FastAPI + MySQL
      </p>
    </div>

    <div className="dashboard">

      <div className="card">
        <h3>👤 Users</h3>
        <p>{counts.total_users}</p>
      </div>

      <div className="card">
        <h3>❓ Questions</h3>
        <p>{counts.total_questions}</p>
      </div>

      <div className="card">
        <h3>📅 Interviews</h3>
        <p>{counts.total_interviews}</p>
      </div>

    </div>

  </div>
);
}

export default Home;