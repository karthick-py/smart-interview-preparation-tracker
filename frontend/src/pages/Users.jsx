import { useEffect, useState } from "react";
import API_URL from "../services/Api.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Get Users
  const getUsers = () => {
    setLoading(true);
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  };

  // Add User
  const addUser = () => {
      if (
    !name.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    alert("All fields are required");
    return;
  }
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User Added Successfully");

        setName("");
        setEmail("");
        setPassword("");

        getUsers();
      });
  };

  // Update User
  const updateUser = () => {
    fetch(`${API_URL}/user/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User Updated Successfully");

        setEditId(null);

        setName("");
        setEmail("");
        setPassword("");

        getUsers();
      });
  };

  // Delete User
  const deleteUser = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) {
     return;
  }
    fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User Deleted Successfully");
        getUsers();
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    if (!isNaN(searchText)) {
      return user.id.toString() === searchText;
    }

    return (
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="page">

      <h2>Users Management</h2>

      <div className="form-container">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!editId && (
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

  <div className="button-group">

  <button
    className="edit-btn"
    onClick={() => {
      if (editId) {
        updateUser();
      } else {
        addUser();
      }
    }}
  >
    {editId ? "Update User" : "Add User"}
  </button>

  {editId && (
    <button
      onClick={() => {
        setEditId(null);
        setName("");
        setEmail("");
        setPassword("");
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
        placeholder="Search User..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {loading ? (
        <h3>Loading Users...</h3>
      ) : (
      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

      <tbody>

        {filteredUsers.length === 0 ? (

          <tr>
            <td colSpan="4">
              No Users Found
            </td>
          </tr>

        ) : (

          filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditId(user.id);
                    setName(user.name);
                    setEmail(user.email);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))

        )}

      </tbody>

      </table>
      )}
    </div>
  );
}

export default Users;