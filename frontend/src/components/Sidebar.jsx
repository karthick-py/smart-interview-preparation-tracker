import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>Interview Tracker</h2>

      <NavLink to="/">
        📊 Dashboard
      </NavLink>

      <NavLink to="/users">
        👤 Users
      </NavLink>

      <NavLink to="/questions">
        ❓ Questions
      </NavLink>

      <NavLink to="/interviews">
        📅 Interviews
      </NavLink>

    </div>
  );
}

export default Sidebar;